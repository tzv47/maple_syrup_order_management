import * as express from "express";
import { ProductController } from "../controllers/product/productController";

const router = express.Router();

router.get("", ProductController.getAllProduct)

router.get("/:id", ProductController.getProduct)

export default router;