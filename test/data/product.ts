import { ProductType } from './../../src/db/models/Product';
import { plainToInstance } from 'class-transformer';
import { Product } from '../../src/db/models';

export const products = plainToInstance(Product, [
  {
    id: '001',
    name: 'Amber maple syrup',
    image: 'string',
    description: '',
    price: 20.1,
    maxQty: 5,
    type: ProductType.AMBER
  },
  {
    id: '002',
    name: 'Dark maple syrup',
    image: 'string',
    description: '',
    price: 20.1,
    maxQty: 5,
    type: ProductType.DARK
  },
  {
    id: '003',
    name: 'Clear maple syrup',
    image: 'string',
    description: '',
    price: 20.1,
    maxQty: 5,
    type: ProductType.CLEAR
  }
]);
