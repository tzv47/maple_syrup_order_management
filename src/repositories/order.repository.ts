import { Service } from 'typedi';
import { IOrder, OrderInput } from './../models/Order';
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

  async createOrder(payload: OrderInput): Promise<IOrder> {
    return await Order.create(payload);
  }
}

export default OrderRepository