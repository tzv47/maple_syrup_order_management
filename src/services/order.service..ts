import { Service } from 'typedi';
import { OrderLineDto } from '../controllers/order/dtos/orderLine.dto';
import { OrderStatus } from '../models/Order';
import OrderRepository from '../repositories/order.repository';
import ProductService from './product.service.';

@Service()
class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService
  ) {}

  public async createOrder(orderDtos: Array<OrderLineDto>): Promise<string[]> {
    const errorList: Array<string> = [];

    await Promise.all(
      orderDtos.map(async ({ productId, qty }) => {
        const remaingQty = await this.productService.getProductRemainingQty(
          productId
        );
        if (remaingQty < qty) {
          errorList.push(`Not enough stock for productId: '${productId}'.`);
        } else {
          // store order
          this.orderRepository.createOrder(
            Object.assign({
              productId,
              qty,
              orderStatus: OrderStatus.CREATED
            })
          );
        }
      })
    );
    return errorList;
  }
}

export default OrderService;
