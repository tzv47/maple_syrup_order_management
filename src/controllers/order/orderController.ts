import { Request, Response } from 'express';
import { Service } from 'typedi';
import { OrderService } from '../../services/';
import { OrderLineDto } from './dtos/orderLine.dto';
import orderMapper from './orderMapper';
import { getUserFromRequest } from './../../utils/utils';

@Service()
class OrderController {
  constructor(private readonly orderService: OrderService) {}

  public async placeOrder(req: Request, res: Response) {
    const user = getUserFromRequest(req);
    const orderDtos = req.body as Array<OrderLineDto>;
    const result = await this.orderService.createOrder(orderDtos, user);
    res.send(orderMapper.toOrderValidationResponseDto(result)).status(200);
  }
}

export default OrderController;
