export interface IMapleSyrup {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  maxQty: number;
  type: MapleSyrupType;
}

export enum MapleSyrupType {
  AMBER = "AMBER",
  DARK = "DARK",
  CLEAR = "CLEAR",
}
