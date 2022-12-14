import { Product } from '../../db/models';
import { CatalogueItemDto } from './dtos/catalogueItem.dto';
import { MapleSyrupDto } from './dtos/mapleSyrup.dto';

class ProductMapper {
  public toCatalogueItemDto(product: Product): CatalogueItemDto {
    return Object.assign({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      maxQty: product.maxQty,
      type: product.type
    });
  }

  public toMapleSyrupDto(product: Product, inStock: number): MapleSyrupDto {
    const { id, name, description, image, price, type } = product;
    return Object.assign({
      id,
      name,
      description,
      image,
      price,
      stock: inStock,
      type
    });
  }
}

export default new ProductMapper();
