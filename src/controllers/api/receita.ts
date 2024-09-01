import { Request, Response } from 'express';
import { Receita } from '../../models/receita';
import con from '../../../config/connection';

const TABLE = 'receita';

export class ReceitaController {

    // Método para listar todos os registros de entradas
    public verTodos(req: Request, res: Response): void {
        con.query(`SELECT * FROM ${TABLE}`, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'An error occurred' });
                return;
            }
            res.status(200).json(results);
        });
    }

    // Método para salvar um novo registro de receita
    public salvar(req: Request, res: Response): void {
        const { valor, descricao, idCategoria, idUsuario } = req.body;

        const receita: Receita = {
            valor,
            descricao,
            dataEntrada : new Date(),
            idCategoria,
            idUsuario,
        };

        con.query(
            `INSERT INTO ${TABLE} (valor, descricao, data_receita, idcategoria, idusuario) VALUES (?, ?, ?, ?, ?);`,
            [
                receita.valor,
                receita.descricao,
                receita.dataEntrada,
                receita.idCategoria,
                receita.idUsuario
            ],
            (err: any, result: any) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'An error occurred' });
                    return;
                }
                console.log(result);
                res.status(200).json(result);
            }
        );
    }
}