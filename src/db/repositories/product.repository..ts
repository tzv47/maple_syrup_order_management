import { Service } from 'typedi';
import { Product } from '../models';
import { IProduct } from '../models/Product';

@Service()
class ProductRepository {
  async getAllProducts(): Promise<IProduct[]> {
    return await Product.findAll();
  }

  async getById(id: string): Promise<IProduct> {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('not found');
    }
    return product;
  }
}

export default ProductRepository;
