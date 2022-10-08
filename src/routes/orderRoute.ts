import * as express from "express";
import { OrderController } from "../controllers/order/orderController";

const router = express.Router();

router.post("", OrderController.placeOrder);

export default router;