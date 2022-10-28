import { MapleSyrup } from "../models";
import { IMapleSyrup } from "../models/Product";
import CartService from "./cartService"

class ProductService {

    public async getProduct(id: string): Promise<IMapleSyrup> {
        const product = await MapleSyrup.findByPk(id)
        if (!product) {
            throw new Error('not found')
        }
        return product
    }

    public async getAll(): Promise<IMapleSyrup[]> {
        return await MapleSyrup.findAll()
    }

    public async getProductRemainingQty(productId: string): Promise<number> {
        const product = await this.getProduct(productId)
        const productInCarts = CartService.findByProductId(productId)
        return product!!.maxQty - productInCarts!!.qty
    }
}

export default new ProductService()