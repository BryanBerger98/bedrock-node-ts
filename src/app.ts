import express, { Request, Response } from 'express';
import Controller from './interfaces/controller.interface';

export default class App {

    readonly app: express.Application;
    readonly port: number;
   
    constructor(controllers: Controller[], port: number) {
      this.app = express();
      this.port = port;
   
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
    }
   
    private initializeMiddlewares(): void {
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: false}));
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