import App from './app';
import Controllers from './controllers';
import Infrastructure from './infrastructure';

const infrastructure = new Infrastructure({database: 'mongo'});
const controllers = new Controllers(infrastructure);
 
const app = new App(
  [
    controllers.authController,
  ],
  3000,
);
 
app.start();