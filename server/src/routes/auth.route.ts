import express from "express";
import {
  registerBusiness,
  login,
  me,
  //logout,
  //getUser,
} from "../controller/auth.controller";
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register-business", registerBusiness);
router.post("/login", login);
router.get("/me", authenticate, me);
//router.post("/logout", logout);
//router.get("/getUser", getUser);

export default router;
