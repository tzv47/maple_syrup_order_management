
import { IMapleSyrup } from "../../db/models/Product";
import { CatalogueItemDto } from "./dtos/catalogueItem.dto";
import { MapleSyrupDto } from "./dtos/mapleSyrup.dto";

class ProductMapper {

    public toCatalogueItemDto(product: IMapleSyrup): CatalogueItemDto {
        return Object.assign({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            maxQty: product.maxQty,
            type: product.type,
        })
    }

    public toMapleSyrupDto(product: IMapleSyrup, inStock: number): MapleSyrupDto {
        const {id, name, description, image, price, type } = product
        return Object.assign ({
            id,
            name,
            description,
            image,
            price,
            stock: inStock,
            type
        })
    }
}

export default new ProductMapper()