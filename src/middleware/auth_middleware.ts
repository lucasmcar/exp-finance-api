import jwt from "jsonwebtoken";
import { Request, Response,  NextFunction } from 'express';


const authenticateJWT = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers['authorization'];

    console.log(req);

    if (authHeader) {
        // O formato esperado é "Bearer <token>"
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403); // Token inválido
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Sem token
    }
};

export default authenticateJWT;