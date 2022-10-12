import * as express from "express";
import { CartController } from "../controllers/cart/cartController";

const router = express.Router();

router.get("", CartController.getCart);

router.patch("/product/:productId", CartController.updateCartQty);

router.delete("/product/:productId", CartController.deleteCart);

export default router;