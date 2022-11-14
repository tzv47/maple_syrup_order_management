import basicAuth from 'express-basic-auth';
import { Request } from 'express';

export const getProductIdFromParam = (req: Request): string => {
  return req.query!!.productId as string;
};

export const getUserFromRequest = (req: Request): string => {
  const { user } = (req as basicAuth.IBasicAuthedRequest).auth;
  return user;
};
