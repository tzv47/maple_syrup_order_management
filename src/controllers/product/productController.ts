import { Request, Response, NextFunction } from 'express';
import productService from '../../services/productService';
import productMapper from './productMapper';

export class ProductController {

    public static async getAllProduct(req: Request, res: Response, next: NextFunction) {
        const productList = await productService.getAll()
        res.send(productList.map(product => productMapper.toCatalogueItemDto(product))).status(200)
    }

    public static async getProduct(req: Request, res: Response, next: NextFunction) {
        const productId = req.params.id
        const product = await productService.getProduct(productId)
        const remainingAmount = await productService.getProductRemainingQty(productId)
        res.send(productMapper.toMapleSyrupDto(product!!, remainingAmount)).status(200)
    }
}