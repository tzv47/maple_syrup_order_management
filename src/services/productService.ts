import { products } from "../data/product";
import { IMapleSyrup } from "../models";
import CartService from "./cartService"

class ProductService {

    public getProduct(id: string): IMapleSyrup | null {
        const product = products.find(product=> product.id===id) || null
        return product
    }

    public getAll(): Array<IMapleSyrup> {
        return products
    }

    public getProductRemainingQty(productId: string): Number {
        const product = this.getProduct(productId)
        const productInCarts = CartService.findByProductId(productId)
        return product!!.maxQty - productInCarts!!.qty
    }
}

export default new ProductService()