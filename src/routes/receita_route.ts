import express from 'express';
import { ReceitaController } from '../controllers/api/receita';
import authenticateJWT from '../middleware/auth_middleware';


const router = express.Router();
const receitaController = new ReceitaController();


/**
 * @swagger
 * /api/v1/receitas/salvar:
 *   post:
 *     summary: Salva uma nova receita
 *     tags: [Receitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *               descricao:
 *                 type: string
 *               dataEntrada:
 *                 type: string
 *                 format: date-time
 *               idCategoria:
 *                 type: integer
 *               idUsuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Receita criada com sucesso.
 *       500:
 *         description: Erro ao salvar a receita.
 */
router
    .route('/api/v1/receita/salvar',)
    .post(authenticateJWT, receitaController.salvar)


/**
 * @swagger
 * /api/v1/receitas:
 *   get:
 *     summary: Retorna todas as receitas
 *     tags: [Receitas]
 *     responses:
 *       200:
 *         description: Lista de receitas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   valor:
 *                     type: number
 *                   descricao:
 *                     type: string
 *                   dataEntrada:
 *                     type: string
 *                     format: date-time
 */
router
    .route('/api/v1/receitas')
    .get(authenticateJWT, receitaController.verTodos);


export default router;

/**, authenticateJWT , (req, res) => {
        res.status(200).json({ message: "Acesso permitido a rota protegida!" })} */