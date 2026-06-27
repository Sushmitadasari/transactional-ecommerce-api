import { Router } from "express";
import * as OrderController from "../controllers/order.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);
router.use(requireRole("CUSTOMER"));

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Checkout cart
 *     description: >
 *       Places an order for the authenticated customer.
 *       The checkout process executes inside a database transaction,
 *       uses optimistic locking to prevent overselling,
 *       updates inventory, clears the cart, and enqueues a background
 *       email job using BullMQ.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: Cart is empty or stock unavailable.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: CUSTOMER role required.
 *       409:
 *         description: Optimistic locking conflict.
 */
router.post(
  "/",
  OrderController.checkout
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     description: Returns a customer's order details.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Order retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: CUSTOMER role required.
 *       404:
 *         description: Order not found.
 */
router.get(
  "/:id",
  OrderController.getOrder
);

export default router;