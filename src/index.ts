import express from 'express';
import cors from 'cors';
import receitaRoute from './routes/receita_route';
import despesaRoute from './routes/despesa_route';
import usuarioRoute from './routes/usuario_route';
import { swaggerDocs } from '../config/swagger';
import dotenv from 'dotenv';

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(receitaRoute);
app.use(despesaRoute);
app.use(usuarioRoute)

swaggerDocs(app, PORT);

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



