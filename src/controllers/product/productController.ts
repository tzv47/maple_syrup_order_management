import { Request, Response, NextFunction } from 'express';
import productService from '../../services/productService';
import productMapper from './productMapper';

export class ProductController {

    public static getAllProduct(req: Request, res: Response, next: NextFunction) {
        const productList = productService.getAll()
        res.send(productList.map(product => productMapper.toCatalogueItemDto(product))).status(200)
    }

    public static getProduct(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.id
        const product = productService.getProduct(productId)
        const remainingAmount = productService.getProductRemainingQty(productId)
        res.send(productMapper.toMapleSyrupDto(product!!, remainingAmount)).status(200)
    }
}