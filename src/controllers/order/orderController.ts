import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { OrderService } from '../../services/';
import { OrderLineDto } from './dtos/orderLine.dto';
import orderMapper from './orderMapper';
import { getUserFromRequest } from './../../utils/utils';

@Service()
class OrderController {
  constructor(private readonly orderService: OrderService) {}

  public async placeOrder(req: Request, res: Response, next: NextFunction) {
    const user = getUserFromRequest(req);
    try {
      const orderDtos = req.body as Array<OrderLineDto>;
      const result = await this.orderService.createOrder(orderDtos, user);
      res.send(orderMapper.toOrderValidationResponseDto(result)).status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
