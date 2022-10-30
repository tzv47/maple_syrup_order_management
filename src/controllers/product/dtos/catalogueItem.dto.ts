import { MapleSyrupType } from "../../../db/models/Product";

export interface CatalogueItemDto {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    maxQty: number;
    type: MapleSyrupType;
}