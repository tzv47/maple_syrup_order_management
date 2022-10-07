export interface Order {
    id: string,
    productId: string,
    qty: string,
    orderStatus: OrderStatus
}

export enum OrderStatus {
    CREATED,
    FAILED
}