import { Request, Response, NextFunction, query } from 'express';
import cartService from '../../services/cartService';
import { getProductIdFromParam } from '../../utils/utils';
import cartMapper from './cartMapper';
export class CartController {

    public static getCart(req: Request, res: Response, next: NextFunction) {
        const data = cartService.getAll()
        res.send(cartMapper.toCartLineDtos(data)).status(200)
    }

    public static updateCartQty(req: Request, res: Response, next: NextFunction) {
        const productId = getProductIdFromParam(req)
        const newQty = parseInt(req.query.limit as string)
        cartService.updateCartQuantity(productId, newQty)
        res.sendStatus(202)
    }

    public static deleteCart(req: Request, res: Response, next: NextFunction) {
        const productId = getProductIdFromParam(req)
        cartService.removeFromCartByProductId(productId)
        res.sendStatus(202)
    }

}