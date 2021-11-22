"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interactors_1 = __importDefault(require("../domain/authentication/interactors"));
const passwords_service_1 = __importDefault(require("../services/passwords.service"));
const tokens_service_1 = __importDefault(require("../services/tokens.service"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
class Controllers {
    constructor(infrastructure) {
        this.infrastructure = infrastructure;
        this.passwordsService = new passwords_service_1.default();
        this.tokensService = new tokens_service_1.default();
        this.authInteractors = new interactors_1.default(this.infrastructure.database.usersRepository, this.passwordsService, this.tokensService);
        this.authController = new auth_controller_1.default(this.authInteractors);
        this.infrastructure.database.run().catch(console.error);
    }
}
exports.default = Controllers;
