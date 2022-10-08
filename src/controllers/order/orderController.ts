import { NextFunction, Request, Response } from 'express';
import orderService from '../../services/orderServices';
import { OrderLineDto } from './dtos/orderLine.dto';
import orderMapper from './orderMapper';
export class OrderController {

    public static placeOrder(req: Request, res: Response, next: NextFunction) {
        const orderDtos = req.body as Array<OrderLineDto>
        const result = orderService.createOrder(orderDtos)
        res.send(orderMapper.toOrderValidationResponseDto(result)).status(200)
    }
}