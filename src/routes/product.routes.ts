import { Router } from "express";
import * as ProductController from "../controllers/product.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Returns all available products. Results may be served from Redis cache.
 *     responses:
 *       200:
 *         description: List of products retrieved successfully.
 */
router.get(
  "/",
  ProductController.getProducts
);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a product by ID
 *     description: Retrieve a single product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Product retrieved successfully.
 *       404:
 *         description: Product not found.
 */
router.get(
  "/:id",
  ProductController.getProduct
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a product
 *     description: Only ADMIN users can create products.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. ADMIN role required.
 */
router.post(
  "/",
  authenticate,
  requireRole("ADMIN"),
  ProductController.createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product
 *     description: Only ADMIN users can update products.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Product not found.
 */
router.put(
  "/:id",
  authenticate,
  requireRole("ADMIN"),
  ProductController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     description: Only ADMIN users can delete products.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Product not found.
 */
router.delete(
  "/:id",
  authenticate,
  requireRole("ADMIN"),
  ProductController.deleteProduct
);

export default router;