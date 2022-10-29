import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import CartService from '../../services/cart.service.';
import cartMapper from './cartMapper';

@Service()
class CartController {
  constructor(private readonly cartService: CartService) {}

  public async getCart(req: Request, res: Response) {
    const data = await this.cartService.getAll();
    res.send(cartMapper.toCartLineDtos(data)).status(200);
  }

  public async updateCartQty(req: Request, res: Response) {
    const productId = req.params.productId;
    const { newQty } = req.body;
    this.cartService.updateCartQuantity(productId, newQty);
    res.sendStatus(202);
  }

  public async deleteCart(req: Request, res: Response) {
    const productId = req.params.productId;
    this.cartService.removeFromCartByProductId(productId);
    res.sendStatus(202);
  }
}

export default CartController