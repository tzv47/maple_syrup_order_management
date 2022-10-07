import { ICart } from "../models/Cart";

export const carts: Array<ICart> = [
    {
        id: "ORD-001",
        productId: "001",
        name:"Maple Syrup RED",
        image: "http://localhost/red.png",
        price: 20,
        qty: 2
    },
    {
        id: "ORD-002",
        productId: "001",
        name:"Maple Syrup RED",
        image: "http://localhost/blue.png",
        price: 20,
        qty: 2
    },
    {
        id: "ORD-003",
        productId: "003",
        name:"Maple Syrup RED",
        image: "http://localhost/orange.png",
        price: 20,
        qty: 2
    }
]