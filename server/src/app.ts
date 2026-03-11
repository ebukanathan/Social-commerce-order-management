import express, { Express } from "express";
import { router } from "./routes";
import authRouter from "./routes/auth.route";
import businessRouter from "./routes/business.route";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);
app.use("/api/auth", authRouter);
app.use("/api/business", businessRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
