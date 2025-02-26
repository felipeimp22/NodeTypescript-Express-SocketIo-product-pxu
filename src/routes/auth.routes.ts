import { Router } from "express";
import AuthController from "../controller/authController";
import { authMiddleware } from "../middleware/auth.middleware";

const AuthRoutes = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
AuthRoutes.post('/register', (req, res) => {
  AuthController.register(req, res);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Auth
 */
AuthRoutes.post('/login', (req, res) => {
  AuthController.login(req, res);
});


export default AuthRoutes;
