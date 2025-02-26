import { Router } from 'express';
import UserController from '../controller/userController';

const UserRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints for user management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     description: Returns a list of all users with pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "507f191e810c19729de860ea"
 *                       email:
 *                         type: string
 *                         example: "test@example.com"
 *                       bought_items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: date
 *                               example: "2025-02-23T10:12:48.362+0000"
 *                             title:
 *                               type: string
 *                               example: "Mountain Bike"
 *                             price:
 *                               type: number
 *                               example: 599.99
 *                             quantity:
 *                               type: number
 *                               example: 2
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
UserRoutes.get('/', (req, res) => {
    UserController.getAll(req, res);
});

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: get my info
 *     tags:
 *       - Users
 *     description: Returns my info.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 bought_items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       title:
 *                         type: string
 *                       price:
 *                         type: number
 *                       quantity:
 *                         type: number
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
UserRoutes.get('/me', (req, res) => {
    UserController.getOne(req, res, true);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get one user by ID
 *     tags:
 *       - Users
 *     description: Returns one user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 bought_items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       title:
 *                         type: string
 *                       price:
 *                         type: number
 *                       quantity:
 *                         type: number
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
UserRoutes.get('/:id', (req, res) => {
    UserController.getOne(req, res);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     description: Deletes a user by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
UserRoutes.delete('/:id', (req, res) => {
    UserController.delete(req, res);
});

export default UserRoutes;
