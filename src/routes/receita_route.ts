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
 * /api/v1/receitas/total:
 *   get:
 *     summary: Retorna total em saidas
 *     tags: [Receitas]
 *     responses:
 *       200:
 *         description: Total em receitas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   valor:
 *                     type: number
 */
router
    .route('/api/v1/receita/total')
    .get(authenticateJWT, receitaController.total)


/**
 * @swagger
 * /api/v1/receitas/ultimos-tres-meses:
 *   get:
 *     summary: Retorna o total dos ultimos 3 meses
 *     tags: [Receitas]
 *     responses:
 *       200:
 *         description: Total em receitas (Últimos 3 meses).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   total:
 *                     type: number
 *                   mes:
 *                     type: number
 */


router
    .route('/api/v1/receita/ultimos-tres-meses')
    .get(authenticateJWT, receitaController.getLastMonths)


router
    .route('/api/v1/receita/categoria/:id')
    .get(authenticateJWT, receitaController.totalReceitaPorCategoria)


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