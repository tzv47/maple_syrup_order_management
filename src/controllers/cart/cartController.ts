import { CreateCartDto } from './dtos/create-cart.dto';
import { getUserFromRequest } from './../../utils/utils';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { CartService } from '../../services/';
import cartMapper from './cartMapper';

@Service()
class CartController {
  constructor(private readonly cartService: CartService) {}

  public async getCart(req: Request, res: Response) {
    const user = getUserFromRequest(req);
    const data = await this.cartService.getAll(user);
    res.send(cartMapper.toCartLineDtos(data)).status(200);
  }

  public async createCart(req: Request, res: Response) {
    const user = getUserFromRequest(req);
    const createCartDto = req.body as CreateCartDto;
    const data = await this.cartService.createCart(createCartDto, user);
    res.sendStatus(202);
  }

  public async updateCartQty(req: Request, res: Response) {
    const productId = req.params.productId;
    const { newQty } = req.body;
    const user = getUserFromRequest(req);
    this.cartService.updateCartQuantity(productId, newQty, user);
    res.sendStatus(202);
  }

  public async deleteCart(req: Request, res: Response) {
    const productId = req.params.productId;
    const user = getUserFromRequest(req);
    this.cartService.removeFromCartByProductId(productId, user);
    res.sendStatus(202);
  }
}

export default CartController;
