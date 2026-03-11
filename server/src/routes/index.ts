import { Router } from "express";

export const router = Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// TODO: Add more routes here
