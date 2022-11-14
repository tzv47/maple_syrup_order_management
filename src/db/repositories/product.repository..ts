import { Service } from 'typedi';
import { Product } from '../models';

@Service()
class ProductRepository {
  async getAllProducts(query: {} = {}): Promise<Product[]> {
    return await Product.findAll({ where: query });
  }

  async getById(id: string): Promise<Product> {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('not found');
    }
    return product;
  }

  async updateMaxqty(id: string, qty: number): Promise<Product> {
    const product = await this.getById(id);
    product.maxQty = product.maxQty - qty;
    return await product.save();
  }
}

export default ProductRepository;
