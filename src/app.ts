import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import basicAuth from 'express-basic-auth';
import { Routes } from './routes';

class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    });
    this.app.use(cors<Request>());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(
      basicAuth({
        users: {
          tzv: 'supersecret',
          testUser: 'password1234'
        }
      })
    );
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.log(`error ${error.message}`);
        const status = error.status || 400;
        res.status(status).send(error.message);
      }
    );
  }
}

export default new App().app;
