import { DataTypes, Model, Optional } from 'sequelize';
import dbConfig from '../db/config';
import MapleSyrup from './Product';

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

export interface OrderInput extends Optional<IOrder, 'id'> {}

class Order extends Model<IOrder, OrderInput> implements IOrder {
  public id!: string;
  public productId!: string;
  public qty!: string;
  public orderStatus!: OrderStatus;
}

Order.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    productId: {
      type: DataTypes.STRING,
      references: { model: MapleSyrup, key: 'id' }
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
