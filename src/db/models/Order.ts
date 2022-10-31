import { DataTypes, Model, Optional, QueryTypes } from 'sequelize';
import dbConfig from '../config';
import Product from './Product';

export interface IOrder {
  id: string;
  productId: string;
  qty: string;
  orderStatus: OrderStatus;
}

export enum OrderStatus {
  CREATED = 'CREATED',
  FAILED = 'FAILED'
}

export interface CreateOrderInput extends Optional<IOrder, 'id'> {}

class Order extends Model<IOrder, CreateOrderInput> implements IOrder {
  public id!: string;
  public productId!: string;
  public qty!: string;
  public orderStatus!: OrderStatus;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: {
      type: DataTypes.STRING,
      references: { model: Product, key: 'id' }
    },
    qty: { type: DataTypes.DOUBLE },
    orderStatus: {
      type: DataTypes.ENUM('CREATED', 'FAILED'),
      defaultValue: 'CREATED'
    }
  },
  { sequelize: dbConfig, tableName: 'orders', timestamps: false }
);

export default Order;
