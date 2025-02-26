import { Router } from 'express';
import HealthCheckController from '../controller/healthCheckController';
import ProductRoutes from './product.routes';
import UserRoutes from './user.routes';
import AuthRoutes from './auth.routes';
import { authMiddleware } from '../middleware/auth.middleware';

const routes = Router();
  /**
   * @swagger
   * /:
   *   get:
   *     summary: Health Check
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Api is running !!"
   *
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: "Not Found"
   */
routes.get('/', (req, res) => {
    HealthCheckController.healthCheck(req, res);
});

routes.use('/product', authMiddleware, ProductRoutes);

routes.use('/user',authMiddleware,  UserRoutes);

routes.use('/auth', AuthRoutes);

export default routes;
