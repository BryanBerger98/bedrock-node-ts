"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interactors_1 = __importDefault(require("../domain/authentication/interactors"));
const authentication_1 = __importDefault(require("./authentication"));
class Controllers {
    constructor(infrastructure) {
        this.infrastructure = infrastructure;
        this.authInteractors = new interactors_1.default(this.infrastructure.database.usersRepository);
        this.authController = new authentication_1.default(this.authInteractors);
        this.infrastructure.database.run().catch(console.error);
    }
}
exports.default = Controllers;
