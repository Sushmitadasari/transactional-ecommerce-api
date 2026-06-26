import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import { setupSwagger } from "./config/swagger";




const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
setupSwagger(app);
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Transactional E-Commerce API"
    });
});

export default app;