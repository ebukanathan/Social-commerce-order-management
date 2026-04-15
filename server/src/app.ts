import express from "express";
import cors from "cors";
import type { Express } from "express";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import authRouter from "./routes/auth.route";
import businessRouter from "./routes/business.route";
import orderRouter from "./routes/order.route";
import productRouter from "./routes/product.route";
import testRoute from "./routes/test.route";
import customerRoutes from "./routes/customer.route";
import whatsappRoutes from "./routes/whatsapp.route";
import incomingMessageRoutes from "./routes/incoming-messages.route";

const app: Express = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies/auth
  }),
);

// Routes
app.use("/api", testRoute);
app.use("/api/auth", authRouter);
app.use("/api/business", businessRouter);
app.use("/api/orders", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/customers", customerRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/incoming-messages", incomingMessageRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
