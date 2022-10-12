import { Request, Response, Application } from 'express';
import cartRoute from "./cartRoute"
import orderRoute from "./orderRoute"
import productRoute from "./productRoute"

export class Routes {

  public routes(app: Application): void {
    app.route('/_status')
      .get((req: Request, res: Response) => {
        res.status(200).send('Healthy!!!');
      });
    
      app.use("/cart", cartRoute)
      app.use("/order", orderRoute)
      app.use("/product", productRoute)
  }
}