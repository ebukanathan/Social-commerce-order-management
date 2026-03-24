import express from "express";
import {
  registerBusiness,
  login,
  //logout,
  //getUser,
} from "../controller/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register-business", registerBusiness);
router.post("/login", login);
//router.post("/logout", logout);
//router.get("/getUser", getUser);

export default router;
