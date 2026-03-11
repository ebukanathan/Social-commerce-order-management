
import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controller/product.controller";

const router = Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;