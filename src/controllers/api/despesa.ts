import { Request, Response } from 'express';
import { Despesa } from '../../models/despesa';
import con from '../../../config/connection';
import { QueryError, RowDataPacket } from 'mysql2';

const TABLE = 'despesa';

export class DespesaController{

    // Método para listar todos os registros de saídas
    verTodasSaidas(req: Request, res: Response): void {
        con.query(`SELECT * FROM ${TABLE}`, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'An error occurred' });
                return;
            }
            res.status(200).json(results);
        });
    }

    totalDespesa(req: Request, res: Response){
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


    totalDespesaPorCategoria(req: Request, res: Response){
        const userId = req.user?.id;
        const categoriaId = req.params.id;

        con.query(`SELECT c.nome, sum(de.valor) AS total FROM ${TABLE} de
            inner join categoria c on 
            de.idcategoria = c.idcategoria
            WHERE de.idusuario = ? AND c.idcategoria = ?
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


    //Metodo para salvar as depesas em banco
    salvarDespesas(req: Request, res: Response) : void {

        const { valor, descricao, idcategoria, idusuario } = req.body;

        const despesa: Despesa = {
            valor,
            descricao,
            data_despesa : new Date(),
            idcategoria,
            idusuario,
        };

        if(despesa.valor < 0){
            res.status(400).json({"code_error": 248, "message" : "Negative value"});
            return;
        }

        con.query(`INSERT INTO ${TABLE} (valor, descricao, data_despesa, idcategoria, idusuario) values (?, ?, ?, ?, ?)`,
            [
                despesa.valor,
                despesa.descricao,
                despesa.data_despesa,
                despesa.idcategoria,
                despesa.idusuario
            ],
            (err: any, result: any) => {
                if(err){
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'An error occurred' });
                    return;
                }
            res.status(200).json(result);
            }
        )
    }


}