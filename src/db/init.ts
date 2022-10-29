import { Cart, Order, MapleSyrup } from '../models';

const dbInit = () =>
  Promise.all([Cart.sync(), Order.sync(), MapleSyrup.sync()]);

export default dbInit;
