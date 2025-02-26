import { Router } from "express";
import ProductController from "../controller/productController";
import { uploadImages } from "../middleware/upload.middleware";

const ProductRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Endpoints for product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     description: Returns a list of all products with pagination, filters, and sorting.
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
 *         description: Number of products per page
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter by product title (case insensitive)
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Sort by date
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price for range filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price for range filter
 *       - in: query
 *         name: inventory
 *         schema:
 *           type: string
 *           enum: [available, soldout]
 *         description: Filter by inventory status
 *     responses:
 *       200:
 *         description: A list of products with pagination, filters, and sorting.
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
ProductRoutes.get("/", (req, res) => {
  ProductController.getAll(req, res);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get one product by ID
 *     tags:
 *       - Products
 *     description: Returns one product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 price:
 *                   type: number
 *                 inventory:
 *                   type: number
 *                 image:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
ProductRoutes.get("/:id", (req, res) => {
  ProductController.getOne(req, res);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Creates a new product entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Mountain Bike"
 *               price:
 *                 type: number
 *                 example: 599.99
 *               inventory:
 *                 type: number
 *                 example: 10
 *               image:
 *                 type: string
 *                 example: "/images/bike-1.jpg"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "507f191e810c19729de860ea"
 *                 title:
 *                   type: string
 *                   example: "Mountain Bike"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
ProductRoutes.post("/", (req, res) => {
  ProductController.create(req, res);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     description: Deletes a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
ProductRoutes.delete("/:id", (req, res) => {
  ProductController.delete(req, res);
});

/**
 * @swagger
 * /products/{id}/upload:
 *   post:
 *     summary: Upload images for a product
 *     tags:
 *       - Products
 *     description: Uploads one or more images for a product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f191e810c19729de860ea"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Images uploaded successfully"
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "image1.jpg"
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
ProductRoutes.post("/:id/upload", uploadImages, (req, res) => {
  ProductController.uploadImages(req, res);
});

/**
 * @swagger
 * /products/buy:
 *   post:
 *     summary: Buy products
 *     tags:
 *       - Products
 *     description: Purchase one or more products and decrease their inventory.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   example: "507f191e810c19729de860ea"
 *                 quantity:
 *                   type: number
 *                   example: 2
 *     responses:
 *       200:
 *         description: Products purchased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products purchased successfully"
 *                 purchasedItems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "Mountain Bike"
 *                       price:
 *                         type: number
 *                         example: 599.99
 *                       quantity:
 *                         type: number
 *                         example: 2
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-24T08:47:11.441Z"
 *       400:
 *         description: Bad request or insufficient inventory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid product ID or quantity"
 *       404:
 *         description: Product or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found for ID: 507f191e810c19729de860ea"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to purchase products"
 */
ProductRoutes.post("/buy", (req, res) => {
    ProductController.buyProduct(req, res);
  });
  

export default ProductRoutes;
