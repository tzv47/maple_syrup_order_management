import { Request, Response, NextFunction } from 'express';
import cartService from '../../services/cartService';
import cartMapper from './cartMapper';
export class CartController {

    public static getCart(req: Request, res: Response, next: NextFunction) {
        const data = cartService.getAll()
        res.send(cartMapper.toCartLineDtos(data)).status(200)
    }

    public static updateCartQty(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.productId
        const { newQty } = req.body
        cartService.updateCartQuantity(productId, newQty)
        res.sendStatus(202)
    }

    public static deleteCart(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.productId
        cartService.removeFromCartByProductId(productId)
        res.sendStatus(202)
    }

}