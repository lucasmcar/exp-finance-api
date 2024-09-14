import { Request, Response } from 'express';
import { Categoria } from '../../../models/categoria';
import con from '../../../../config/connection';
import { RowDataPacket } from 'mysql2';
import { compare } from 'bcryptjs';


const TABLE = 'categoria';

export class CategoriaController{


    salvarCategoriaCustom(req: Request, res: Response){

        const userId = req.user?.id;
        const { nome } = req.body;

        const categoria : Categoria = {
            nome,
            idusuario : userId
        }

        con.query(`INSERT INTO ${TABLE} (nome, idusuario) VALUES (?, ?)`, 
            [categoria.nome, categoria.idusuario],
            (err: any, result: RowDataPacket[]) =>{
                if(err){
                    console.error('Error while executing query:', err);
                    res.status(500).json({ error: 'Error occurred' });
                    return;
                }
                res.status(200).json(result);
            }
        );

    }

    retornarCategoriaPorUsuario(req: Request, res: Response){

        const idusuario = req.params.id;

        con.query(`SELECT nome FROM ${TABLE} WHERE idusuario = ?`,
            [idusuario],
            (err: any, result: any) => {
                if(err){
                    console.error('Error while executing query:', err);
                    res.status(500).json({ error: 'Error occurred' });
                    return;
                }
                res.status(200).json(result);
            }
        );

    }

    editarCategoria(req: Request, res: Response){

        const userId= req.user?.id;

        const { nome, idcategoria } = req.body;

        const categoria: Categoria = {
            nome,
            idcategoria,
            idusuario: userId
        }

        con.query(`UPDATE ${TABLE} SET nome = ? WHERE idusuario = ? AND idcategoria = ?`,
            [categoria.nome, userId, Number(idcategoria)],
            (err: any, result: RowDataPacket[]) =>{
                if(err){
                    console.error('Error while executing query:', err);
                    res.status(500).json({ error: 'Error occurred' });
                    return;
                }
                res.status(200).json(result);
            }
        );

    }

    deletarCategoria(req: Request, res: Response){

        const userId= req.user?.id;

        const { idcategoria } = req.body;

        const categoria: Categoria = {
            nome: "",
            idcategoria,
            idusuario: userId
        }

        con.query(`DELETE FROM ${TABLE} WHERE idusuario = ? AND idcategoria = ?`,
            [userId, Number(idcategoria)],
            (err: any, result: RowDataPacket[]) =>{
                if(err){
                    console.error('Error while executing query:', err);
                    res.status(500).json({ error: 'Error occurred' });
                    return;
                }
                res.status(200).json(result);
            }
        );
    }

}