import { products } from './product';
import { plainToInstance } from 'class-transformer';
import { Cart } from '../../src/db/models';

export const carts = plainToInstance(Cart, [
  {
    id: 'CART-001',
    productId: '001',
    product: products[0],
    qty: 2
  },
  {
    id: 'CART-002',
    productId: '002',
    product: products[1],
    qty: 2
  },
  {
    id: 'CART-003',
    productId: '003',
    product: products[2],
    qty: 2
  }
]);
