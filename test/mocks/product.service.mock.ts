import { createMock } from 'ts-jest-mock';
import { products } from './../data/product';
import { ProductRepository } from '../../src/db/repositories';

const mockProductRepository = createMock<ProductRepository>({
  getAllProducts: async () => {
    return products;
  },
  getById: async (id: string) => {
    return products.find((product) => product.id == id)!!;
  },
  updateMaxqty: async (id: string, qty: number) => {
    const product = products.find((product) => product.id == id)!!;
    product.maxQty = product.maxQty = qty;
    return product;
  }
});

export default mockProductRepository;
