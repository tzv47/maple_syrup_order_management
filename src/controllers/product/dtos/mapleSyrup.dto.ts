export interface MapleSyrupDto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  type: MapleSyrupType;
}

export enum MapleSyrupType {
  AMBER,
  DARK,
  CLEAR,
}
