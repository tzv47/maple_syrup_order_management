import Cart from './Cart';
import Order from './Order';
import Product from './Product';

Cart.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'id',
  as: 'product'
});

export { Cart, Order, Product };
