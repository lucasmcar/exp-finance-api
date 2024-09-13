import { Request, Response } from 'express';
import { Usuario } from '../../models/usuario';
import con from '../../../config/connection';
import jwt from 'jsonwebtoken';

import * as bcrypt from 'bcryptjs';

const TABLE = 'usuario';

export class UsuarioController{

    async salvar(req: Request, res: Response) : Promise<void> {
        
        const { nome, email, senha } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        const usuario : Usuario = {
            nome,
            email, 
            senha: hashedPassword
        }

        con.query("INSERT INTO " +TABLE+ " (nome, email, senha) VALUES (?, ?, ?)" , [
           usuario.nome,
           usuario.email,
           usuario.senha 
        ],(err: any, result: any) =>{
            if(err){
                console.error(err);
                res.status(500).json({error: "Server error: "+ err});
                return;
            }
            return res.status(200).json({result});
        });
    }

    async login(req: Request, res: Response) : Promise<void>{

        const { email, senha } = req.body;

        console.log(req.body)


        try {
            // Verifica se o usuário existe no banco de dados
            con.query("SELECT * FROM " +TABLE+ " WHERE email = ?", [email], async (err: any, results: any) => {
                if (err) {
                    return res.status(500).json({ error: "Erro ao acessar o banco de dados" });
                }

                const usuario = results[0];
                if (!usuario) {
                    return res.status(401).json({ error: "Usuário ou senha inválidos" });
                }

                // Comparar a senha fornecida com a senha armazenada
                const senhaValida = await bcrypt.compare(senha, usuario.senha);
                if (!senhaValida) {
                    return res.status(401).json({ error: "Senha inválidos" });
                }

                // Gerar token JWT
                const token = jwt.sign(
                    { id: usuario.idusuario, email: usuario.email }, // Payload do token
                    process.env.JWT_SECRET as string,         // Chave secreta
                    { expiresIn: '1h' }                       // Tempo de expiração
                );

             

                return res.status(200).json({ token,
                    id: usuario.idusuario,
                    nome: usuario.nome }); // Retorna o token JWT
            });
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            res.status(500).json({ error: "Erro no servidor" });
        }

    }
}