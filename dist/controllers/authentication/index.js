"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class AuthController {
    constructor(authInteractors) {
        this.authInteractors = authInteractors;
        this.path = '/auth';
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', this.registerUser.bind(this));
        this.router.get('/', this.getAllUsers.bind(this));
    }
    registerUser(req, res) {
        this.authInteractors.registerUser.execute(req.body)
            .then((response) => res.status(201).json(response))
            .catch((error) => res.status(500).json(error.message));
    }
    getAllUsers(req, res) {
        this.authInteractors.getAllUsers.execute()
            .then((response) => res.status(200).json(response))
            .catch((error) => res.status(500).json(error.message));
    }
}
exports.default = AuthController;
