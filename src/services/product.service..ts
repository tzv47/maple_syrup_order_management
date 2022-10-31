import { Service } from 'typedi';
import { IProduct } from '../db/models/Product';
import { ProductRepository, CartRepository } from '../db/repositories';

@Service()
class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository
  ) {}

  public async getProduct(id: string): Promise<IProduct> {
    return await this.productRepository.getById(id);
  }

  public async getAll(): Promise<IProduct[]> {
    return await this.productRepository.getAllProducts();
  }

  public async getProductRemainingQty(productId: string): Promise<number> {
    const product = await this.productRepository.getById(productId);
    const productInCarts = await this.cartRepository.getCartByProductId(
      productId
    );
    return product.maxQty - productInCarts!!.qty;
  }
}

export default ProductService;
