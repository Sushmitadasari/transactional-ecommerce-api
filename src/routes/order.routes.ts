import { Router } from "express";

import * as OrderController from "../controllers/order.controller";

import { authenticate } from "../middleware/auth.middleware";

import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.use(requireRole("CUSTOMER"));

router.post(
    "/",
    OrderController.checkout
);

router.get(
    "/:id",
    OrderController.getOrder
);

export default router;