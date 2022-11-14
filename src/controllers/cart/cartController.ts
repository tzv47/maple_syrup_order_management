import { CreateCartDto } from './dtos/create-cart.dto';
import { getUserFromRequest } from './../../utils/utils';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { CartService } from '../../services/';
import cartMapper from './cartMapper';

@Service()
class CartController {
  constructor(private readonly cartService: CartService) {}

  public async getCart(req: Request, res: Response, next: NextFunction) {
    const user = getUserFromRequest(req);
    try {
      const data = await this.cartService.getAll(user);
      res.send(cartMapper.toCartLineDtos(data)).status(200);
    } catch (error) {
      next(error);
    }
  }

  public async createCart(req: Request, res: Response, next: NextFunction) {
    const user = getUserFromRequest(req);
    const createCartDto = req.body as CreateCartDto;
    try {
      const data = await this.cartService.createCart(createCartDto, user);
      res.sendStatus(202);
    } catch (error) {
      next(error);
    }
  }

  public async updateCartQty(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const { newQty } = req.body;
    const user = getUserFromRequest(req);
    try {
      this.cartService.updateCartQuantity(productId, newQty, user);
      res.sendStatus(202);
    } catch (error) {
      next(error);
    }
  }

  public async deleteCart(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const user = getUserFromRequest(req);
    try {
      this.cartService.removeFromCartByProductId(productId, user);
      res.sendStatus(202);
    } catch (error) {
      next(error);
    }
  }
}

export default CartController;
