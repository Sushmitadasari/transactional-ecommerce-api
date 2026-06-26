import { Router } from "express";

import * as ProductController from "../controllers/product.controller";

import { authenticate } from "../middleware/auth.middleware";

import { requireRole } from "../middleware/role.middleware";

const router = Router();

// Public

router.get(
    "/",
    ProductController.getProducts
);

router.get(
    "/:id",
    ProductController.getProduct
);

// Admin

router.post(
    "/",
    authenticate,
    requireRole("ADMIN"),
    ProductController.createProduct
);

router.put(
    "/:id",
    authenticate,
    requireRole("ADMIN"),
    ProductController.updateProduct
);

router.delete(
    "/:id",
    authenticate,
    requireRole("ADMIN"),
    ProductController.deleteProduct
);

export default router;