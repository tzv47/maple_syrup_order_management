import { Cart, Order, Product } from './models';

const dbInit = () =>
  Promise.all([Cart.sync(), Order.sync(), Product.sync()]);

export default dbInit;
