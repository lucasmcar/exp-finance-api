import express from 'express';
import { DespesaController } from '../../controllers/api/v1/despesa';
import authenticateJWT from '../../middleware/auth_middleware';



const router = express.Router();
const despesaController = new DespesaController();


/**
 * @swagger
 * /api/v1/despesas:
 *   get:
 *     summary: Retorna todas as despesas
 *     tags: [Despesa]
 *     responses:
 *       200:
 *         description: Lista de Despesas.
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
 *                   dataSaida:
 *                     type: string
 *                     format: date-time
 */
router
    .route('/api/v1/despesas')
    .get(authenticateJWT, despesaController.verTodasSaidas);


/**
 * @swagger
 * /api/v1/despesas/total:
 *   get:
 *     summary: Retorna total em despesas
 *     tags: [Despesa]
 *     responses:
 *       200:
 *         description: Total em despesas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   total:
 *                     type: number
 * 
 */
router
    .route('/api/v1/despesas/total')
    .get(authenticateJWT, despesaController.totalDespesa)

/**
 * @swagger
 * /api/v1/despesa/salvar:
 *   post:
 *     summary: Salva uma nova despesa
 *     tags: [Despesa]
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
 *               dataSaida:
 *                 type: string
 *                 format: date-time
 *               idCategoria:
 *                 type: integer
 *               idUsuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Saída registrada com sucesso.
 *       400:
 *         description: Valor inserido não pode ser negativo
 *       500:
 *         description: Erro ao salvar a despesa.
 */
router
    .route('/api/v1/despesa/salvar')
    .post(authenticateJWT, despesaController.salvarDespesas);


/**
 * @swagger
 * /api/v1/despesa/categoria/:id:
 *   get:
 *     summary: Retorna total da categoria da despesa
 *     tags: [Despesa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total:
 *                 type: number
 *               nome:
 *                 type: string
 *                
 *     responses:
 *       200:
 *         description: Sucesso.
 *       500:
 *         description: Erro ao retornar os dados.
 */    
router
    .route('/api/v1/despesa/categoria/:id')
    .get(authenticateJWT, despesaController.totalDespesaPorCategoria);

export default router;