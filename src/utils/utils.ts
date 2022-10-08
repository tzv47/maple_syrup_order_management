import { Request } from "express"

export const getProductIdFromParam = (req: Request): string => {
    return  req.query!!.productId as string
}