import {
  DataTypes,
  Model,
  NonAttribute,
  Optional,
  QueryTypes
} from 'sequelize';
import dbConfig from '../config';
import Product from './Product';

interface ICart {
  id: string;
  productId: string;
  qty: number;
  user: string;
}

export interface CreateCartInput extends Optional<ICart, 'id'> {}

class Cart extends Model<ICart> implements ICart {
  public id!: string;
  public productId!: string;
  public qty!: number;
  public user!: string;
  declare product: NonAttribute<Product>;
}

Cart.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    productId: {
      type: DataTypes.STRING,
      references: { model: Product, key: 'id' }
    },
    qty: { type: DataTypes.DOUBLE },
    user: { type: DataTypes.STRING }
  },
  { sequelize: dbConfig, tableName: 'carts', timestamps: false }
);

Cart.beforeSave(async (cart) => {
  const lastVal = (await Cart.sequelize?.query(
    'SELECT MAX(cast(SUBSTR(id, 6) as int)) FROM carts;',
    { type: QueryTypes.SELECT }
  )) as { max: number }[];
  const nextValue = lastVal ? (lastVal[0].max as number) + 1 : 1;

  cart.id = `CART-${String(nextValue).padStart(3, '0')}`;
});

export default Cart;
