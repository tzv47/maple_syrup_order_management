import { DataTypes, Model } from 'sequelize';
import dbConfig from '../config';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  maxQty: number;
  type: ProductType;
}

export enum ProductType {
  AMBER = 'AMBER',
  DARK = 'DARK',
  CLEAR = 'CLEAR'
}

class Product extends Model<IProduct> implements IProduct {
  public id!: string;
  public name!: string;
  public description!: string;
  public image!: string;
  public price!: number;
  public maxQty!: number;
  public type!: ProductType;
}

Product.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    description: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.DECIMAL },
    maxQty: { type: DataTypes.DOUBLE },
    type: {
      type: DataTypes.ENUM('AMBER', 'DARK', 'CLEAR'),
      defaultValue: 'AMBER'
    }
  },
  { sequelize: dbConfig, tableName: 'products', timestamps: false }
);

export default Product;
