import express from "express";
import type { Express } from "express";
import { router } from "./routes";
import authRouter from "./routes/auth.route";
import businessRouter from "./routes/business.route";
import orderRouter from "./routes/order.route";
import productRouter from "./routes/product.route"


const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/business", businessRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);


// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
