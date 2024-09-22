import { Request, Response } from 'express';
import { Receita } from '../../../models/receita';
import con from '../../../../config/connection';
import { RowDataPacket } from 'mysql2';

const TABLE = 'receita';

export class ReceitaController {

    // Método para listar todos os registros de entradas
    verTodos(req: Request, res: Response): void {
        con.query(`SELECT c.nome, r.idreceita, r.valor, r.descricao, r.data_receita FROM ${TABLE} r inner JOIN categoria c on r.idcategoria = c.idcategoria;`, (err, results: RowDataPacket[]) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'An error occurred' });
                return;
            }
            res.status(200).json(results);
        });
    }

    getLastMonths(req: Request, res: Response){
        const userId = req.user?.id;

        con.query(`
            SELECT SUM(valor) AS total, MONTH(data_receita) AS mes 
            FROM ${TABLE} 
            WHERE idusuario = ? AND data_receita >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
            GROUP BY MONTH(data_receita)`, [userId],(err: any, result: RowDataPacket[]) =>{
                if (err) {
                    console.error('Error while executing query:', err);
                    res.status(500).json({ error: 'Error occurred' });
                    return;
                }
                return res.status(200).json(result); // Retorna o total como um único objeto
            }
        )

    }

    total(req: Request, res: Response){
        const userId = req.user?.id;
        
        con.query(`SELECT sum(valor) AS total FROM ${TABLE} WHERE idusuario = ?`,[userId], (err, result: RowDataPacket[]) => {
            if (err) {
                console.error('Error while executing query:', err);
                res.status(500).json({ error: 'Error occurred' });
                return;
            }
            const total = result[0]?.total || 0;
            console.log(total)
            return res.status(200).json(total); // Retorna o total como um único objeto
        });
    }

    totalReceitaPorCategoria(req: Request, res: Response){
        const userId = req.user?.id;
        const categoriaId = req.params.id;

        con.query(`SELECT c.nome, sum(r.valor) AS total FROM ${TABLE} r
            inner join categoria c on 
            r.idcategoria = c.idcategoria
            WHERE r.idusuario = ? AND c.idcategoria = ?
            group by c.nome
            `,[userId, categoriaId], (err, result: RowDataPacket[]) => {
            if (err) {
                console.error('Error while executing query:', err);
                res.status(500).json({ error: 'Error occurred' });
                return;
            }
            
            return res.status(200).json(result); // Retorna o total como um único objeto
        });
    }

    

    // Método para salvar um novo registro de receita
    salvar(req: Request, res: Response): void {
    
        const { valor, descricao, idcategoria, idusuario } = req.body;

        const receita: Receita = {
            valor,
            descricao,
            data_receita : new Date(),
            idcategoria,
            idusuario,
        };

        

        con.query(
            `INSERT INTO ${TABLE} (valor, descricao, data_receita, idcategoria, idusuario) VALUES (?, ?, ?, ?, ?);`,
            [
                receita.valor,
                receita.descricao,
                receita.data_receita,
                receita.idcategoria,
                receita.idusuario
            ],
            (err: any, result: any) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'An error occurred' });
                    return;
                }
                res.status(200).json(result);
            }
        );
    }
}