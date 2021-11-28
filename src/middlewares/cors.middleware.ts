import express, { Request } from 'express';
import config from '../environment/env.config';
import cors from 'cors';

export default class CorsMiddleware {

    private readonly app: express.Application;

    constructor() {
        this.app = express();
        this.init = this.init.bind(this);
    }

    init() {
        this.app.use(cors());
        return this.app;
    }

}