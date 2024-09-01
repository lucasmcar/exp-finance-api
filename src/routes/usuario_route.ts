import { UsuarioController } from "../controllers/api/usuario";
import  express  from "express";
import { Usuario } from "../models/usuario";

const router = express.Router();
const usuarioController = new UsuarioController();


/**
 * @swagger
 * /api/v1/registro/usuario:
 *   post:
 *     summary: Registra uma novo usuário
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso.
 *       500:
 *         description: Erro ao registrar a usúario.
 */
router
    .route('/api/v1/registro/usuario')
    .post(usuarioController.salvar);


router
    .route('/api/v1/auth')
    .post(usuarioController.login);

router.route('').put();

router.route('').delete();

export default router;
