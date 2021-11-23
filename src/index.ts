import App from './app';
import Controllers from './controllers';
import Infrastructure from './infrastructure';
import config from './environment/env.config';

const infrastructure = new Infrastructure({database: 'mongo', dbURI: <string>process.env.MONGODB_URI});
const controllers = new Controllers(infrastructure);

const app = new App(
  [
    controllers.authController,
  ],
  config.PORT,
);
 
app.start();