import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Transactional E-Commerce API"
    });
});

export default app;