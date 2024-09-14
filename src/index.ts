import express from 'express';
import cors from 'cors';
import receitaRoute from './routes/v1/receita_route';
import despesaRoute from './routes/v1/despesa_route';
import usuarioRoute from './routes/v1/usuario_route';
import categoriaRoute from './routes/v1/categoria_route';
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
app.use(categoriaRoute)

swaggerDocs(app, PORT);

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



