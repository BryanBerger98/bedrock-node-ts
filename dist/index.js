"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const controllers_1 = __importDefault(require("./controllers"));
const infrastructure_1 = __importDefault(require("./infrastructure"));
const infrastructure = new infrastructure_1.default({ database: 'mongo' });
const controllers = new controllers_1.default(infrastructure);
const app = new app_1.default([
    controllers.authController,
], 3000);
app.start();
