"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = __importDefault(require("./mongo"));
class Infrastructure {
    constructor(options) {
        switch (options.database) {
            case 'mongo':
                this.database = new mongo_1.default();
                break;
            case 'postgres':
                this.database = new mongo_1.default();
                break;
            default:
                this.database = new mongo_1.default();
                break;
        }
    }
}
exports.default = Infrastructure;
