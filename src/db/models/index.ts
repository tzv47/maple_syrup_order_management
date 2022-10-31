import Cart from './Cart';
import Order from './Order';
import Product from './Product';

Product.hasMany(Cart, {
  sourceKey: 'id',
  foreignKey: 'productId',
  as: 'product',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Cart.belongsTo(Product, { foreignKey: 'productId', targetKey: 'id' });

export { Cart, Order, Product };
