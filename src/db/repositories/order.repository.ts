import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';

import { CreateOrderInput } from './../models/Order';
import { IOrder } from '../models/Order';
import { Order } from '../models';

@Service()
class OrderRepository {
  async getAllOrders(): Promise<IOrder[]> {
    return await Order.findAll();
  }

  async getById(id: string): Promise<IOrder> {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error('not found');
    }
    return order;
  }

  async createOrder({ productId, qty }: CreateOrderInput): Promise<IOrder> {
    const order = plainToInstance(Order, { productId, qty });

    return await order.save();
  }
}

export default OrderRepository;
