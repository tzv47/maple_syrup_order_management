import { OrderLineDto } from "../controllers/order/dtos/orderLine.dto";
import productService from "./productService";

class OrderService {
  public createOrder(orderDtos: Array<OrderLineDto>): Array<string> {
    const errorList: Array<string> = [];
    orderDtos.forEach(({ productId, qty }) => {
      const remaingQty = productService.getProductRemainingQty(productId);
      if (remaingQty < qty) {
        errorList.push(`Not enough stock for productId: '${productId}'.`);
      } else {
        // store order
      }
    });
    return errorList;
  }
}

export default new OrderService();
