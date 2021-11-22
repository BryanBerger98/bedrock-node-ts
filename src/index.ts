import App from './app';
import Controllers from './controllers';
import Infrastructure from './infrastructure';

import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(__dirname, '../.env')});
const { PORT, MONGODB_URI } = process.env;

const infrastructure = new Infrastructure({database: 'mongo', dbURI: <string>MONGODB_URI});
const controllers = new Controllers(infrastructure);
 
const app = new App(
  [
    controllers.authController,
  ],
  parseInt(<string>PORT, 10) || 3000,
);
 
app.start();