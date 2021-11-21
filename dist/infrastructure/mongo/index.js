"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const users_repository_1 = __importDefault(require("./repositories/users.repository"));
class MongoDB {
    constructor() {
        this.usersRepository = new users_repository_1.default();
    }
    run() {
        return new Promise((resolve, reject) => {
            (0, mongoose_1.connect)('mongodb://localhost:27017/bedrock-node')
                .then(() => {
                console.log('Mongo DB connected successfully');
            }).catch(reject);
        });
    }
}
exports.default = MongoDB;
