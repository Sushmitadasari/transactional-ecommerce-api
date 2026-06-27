import { Router } from "express";
import * as CartController from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(requireRole("CUSTOMER"));

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get customer cart
 *     description: Returns the authenticated customer's shopping cart along with all cart items.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: CUSTOMER role required.
 */
router.get(
  "/",
  CartController.getCart
);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add item to cart
 *     description: Adds a product to the authenticated customer's cart.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Item added to cart successfully.
 *       400:
 *         description: Invalid request or insufficient stock.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: CUSTOMER role required.
 */
router.post(
  "/items",
  CartController.addItem
);

/**
 * @swagger
 * /api/cart/items/{id}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Remove item from cart
 *     description: Removes an item from the authenticated customer's shopping cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cart Item ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Item removed successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: CUSTOMER role required.
 *       404:
 *         description: Cart item not found.
 */
router.delete(
  "/items/:id",
  CartController.removeItem
);

export default router;