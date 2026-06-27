import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";

import { setupSwagger } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "Transactional E-Commerce API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

export default app;