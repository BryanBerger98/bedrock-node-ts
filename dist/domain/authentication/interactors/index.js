"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_all_users_interactor_1 = __importDefault(require("./get-all-users.interactor"));
const register_user_interactor_1 = __importDefault(require("./register-user.interactor"));
class AuthInteractors {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.registerUser = new register_user_interactor_1.default(this.usersRepository);
        this.getAllUsers = new get_all_users_interactor_1.default(this.usersRepository);
    }
}
exports.default = AuthInteractors;
