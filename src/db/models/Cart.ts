import { DataTypes, Model, NonAttribute } from 'sequelize';
import dbConfig from '../config';
import Product from './Product';

interface ICart {
  id: string;
  productId: string;
  qty: number;
}

class Cart extends Model<ICart> implements ICart {
  public id!: string;
  public productId!: string;
  public qty!: number;
  declare product: NonAttribute<Product>;
}

Cart.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    productId: {
      type: DataTypes.STRING,
      references: { model: Product, key: 'id' }
    },
    qty: { type: DataTypes.DOUBLE }
  },
  { sequelize: dbConfig, tableName: 'carts', timestamps: false }
);

export default Cart;
