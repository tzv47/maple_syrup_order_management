import * as express from "express";
import { CartController } from "../controllers/cart/cartController";

const router = express.Router();

router.get("", CartController.getCart);

router.patch("", CartController.updateCartQty);

export default router;
