import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface Env {
    PORT?: number,
    MONGODB_URI?: string,
    JWT_SECRET?: string,
    EMAIL_HOST?: string,
    EMAIL_PORT?: number,
    EMAIL_USER?: string,
    EMAIL_PASS?: string,
    FRONT_URL?: string
}

interface Config {
    PORT?: number,
    MONGODB_URI?: string,
    JWT_SECRET?: string,
    EMAIL_HOST?: string,
    EMAIL_PORT?: number,
    EMAIL_USER?: string,
    EMAIL_PASS?: string,
    FRONT_URL?: string
}

const getConfig = (): Env => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT): undefined,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    FRONT_URL: process.env.FRONT_URL
  };
};

const getSanitzedConfig = (config: Env): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;


