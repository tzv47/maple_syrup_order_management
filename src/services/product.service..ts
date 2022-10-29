import { Service } from 'typedi';
import { IMapleSyrup } from '../models/Product';
import ProductRepository from '../repositories/product.repository.';
import CartService from './cart.service.';

@Service()
class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartService: CartService
  ) {}

  public async getProduct(id: string): Promise<IMapleSyrup> {
    return await this.productRepository.getById(id);
  }

  public async getAll(): Promise<IMapleSyrup[]> {
    return await this.productRepository.getAllProducts();
  }

  public async getProductRemainingQty(productId: string): Promise<number> {
    const product = await this.productRepository.getById(productId);
    const productInCarts = await this.cartService.findByProductId(productId);
    return product.maxQty - productInCarts!!.qty;
  }
}

export default ProductService;
