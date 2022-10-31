import { Service } from 'typedi';
import { Product } from '../models';

@Service()
class ProductRepository {
  async getAllProducts(): Promise<Product[]> {
    return await Product.findAll();
  }

  async getById(id: string): Promise<Product> {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('not found');
    }
    return product;
  }
}

export default ProductRepository;
