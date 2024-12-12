import { Router } from "express";
import upload from "../middlewares/upload";
import * as ProductController from "../controllers/productController"

const router = Router()

router.get("/", ProductController.getAllProducts)
router.get("/:id", ProductController.getProductById)
router.post("/", upload.single("image"), ProductController.addProduct)
router.delete("/:id", ProductController.deleteProduct)

export default router