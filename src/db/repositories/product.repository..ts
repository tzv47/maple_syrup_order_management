import { Service } from 'typedi';
import { MapleSyrup } from '../models';
import { IMapleSyrup } from '../models/Product';

@Service()
class ProductRepository {
  async getAllProducts(): Promise<IMapleSyrup[]> {
    return await MapleSyrup.findAll();
  }

  async getById(id: string): Promise<IMapleSyrup> {
    const product = await MapleSyrup.findByPk(id);
    if (!product) {
      throw new Error('not found');
    }
    return product;
  }
}

export default ProductRepository;
