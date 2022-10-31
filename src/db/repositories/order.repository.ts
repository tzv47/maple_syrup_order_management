import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';

import { CreateOrderInput } from './../models/Order';
import { Order } from '../models';

@Service()
class OrderRepository {
  async getAllOrders(): Promise<Order[]> {
    return await Order.findAll();
  }

  async getById(id: string): Promise<Order> {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error('not found');
    }
    return order;
  }

  async createOrder({ productId, qty }: CreateOrderInput): Promise<Order> {
    const order = plainToInstance(Order, { productId, qty });

    return await order.save();
  }
}

export default OrderRepository;
