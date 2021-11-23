import express, { Request, RequestHandler, Response } from 'express';
import Controller from './interfaces/controller.interface';
import cookieParser from 'cookie-parser';
import PassportMiddleware from './middlewares/passport.middleware';

export default class App {

    readonly app: express.Application;
    readonly port: number;
    constructor(controllers: Controller[], port: number | undefined) {
      this.app = express();
      this.port = port ? port : 3000;
   
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
    }
   
    private initializeMiddlewares(): void {
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: false}));
      this.app.use(cookieParser());
      this.app.use(new PassportMiddleware().init());
    }
   
    private initializeControllers(controllers: Controller[]): void {
      controllers.forEach((controller: Controller) => {
        this.app.use(controller.path, controller.router);
      });
    }
   
    public start(): void {
      this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    }

}