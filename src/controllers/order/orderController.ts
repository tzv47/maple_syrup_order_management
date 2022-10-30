import { Request, Response } from 'express';
import { Service } from 'typedi';
import { OrderService } from '../../services/';
import { OrderLineDto } from './dtos/orderLine.dto';
import orderMapper from './orderMapper';

@Service()
class OrderController {
  constructor(private readonly orderService: OrderService) {}

  public async placeOrder(req: Request, res: Response) {
    const orderDtos = req.body as Array<OrderLineDto>;
    const result = await this.orderService.createOrder(orderDtos);
    res.send(orderMapper.toOrderValidationResponseDto(result)).status(200);
  }
}

export default OrderController;
