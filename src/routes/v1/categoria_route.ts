import express from 'express';
import { CategoriaController } from '../../controllers/api/v1/categoria';
import authenticateJWT from '../../middleware/auth_middleware';



const router = express.Router();
const categoriaController = new CategoriaController();


/**
 * @swagger
 * /api/v1/categoria/salvar:
 *   post:
 *     summary: Salva uma nova categoria
 *     tags: [Categoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string  
 *               idusuario:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Categoria registrada com sucesso.
 *       500:
 *         description: Erro ao salvar a categoria.
 */
router 
    .route('/api/v1/categoria/salvar')
    .post(authenticateJWT, categoriaController.salvarCategoriaCustom)


/**
 * @swagger
 * /api/v1/categoria/usuario/:id:
 *   get:
 *     summary: Retorna as categorias do usuário
 *     tags: [Categoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
    .route('/api/v1/categoria/usuario/:id')
    .get(authenticateJWT, categoriaController.retornarCategoriaPorUsuario)


    /**
 * @swagger
 * /api/v1/categoria/editar:
 *   put:
 *     summary: Edita o nome da categorias do usuário
 *     tags: [Categoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                
 *     responses:
 *       200:
 *         description: Sucesso ao atualizar categoria.
 *       500:
 *         description: Erro ao atualizar os dados.
 */   
router 
    .route('/api/v1/categoria/editar')
    .put(authenticateJWT, categoriaController.editarCategoria);



    router 
    .route('/api/v1/categoria/remover')
    .delete(authenticateJWT, categoriaController.deletarCategoria);


export default router;