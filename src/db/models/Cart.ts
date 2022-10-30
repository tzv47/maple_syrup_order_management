import { DataTypes, Model } from 'sequelize'
import dbConfig from "../config"
import MapleSyrup from './Product';

export interface ICart {
  id: string;
  productId: string;
  qty: number;
}

class Cart extends Model<ICart> implements ICart {
  public id!: string;
  public productId!: string;
  public qty!: number;
}

Cart.init({
  id: { type: DataTypes.STRING, primaryKey: true },
  productId: { type: DataTypes.STRING, references: {model: MapleSyrup, key: "id"} },
  qty: { type: DataTypes.DOUBLE },
}, { sequelize: dbConfig, tableName: 'carts', timestamps: false })

export default Cart