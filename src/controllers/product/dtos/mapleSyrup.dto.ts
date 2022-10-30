import { MapleSyrupType } from "../../../db/models/Product";

export interface MapleSyrupDto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  type: MapleSyrupType;
}