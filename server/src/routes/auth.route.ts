import express from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "../controller/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getUser", getUser);

export default router;
