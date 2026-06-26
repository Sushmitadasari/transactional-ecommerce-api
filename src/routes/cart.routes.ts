import { Router } from "express";

import * as CartController from "../controllers/cart.controller";

import { authenticate } from "../middleware/auth.middleware";

import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.use(requireRole("CUSTOMER"));

router.get(
    "/",
    CartController.getCart
);

router.post(
    "/items",
    CartController.addItem
);

router.delete(
    "/items/:id",
    CartController.removeItem
);

export default router;