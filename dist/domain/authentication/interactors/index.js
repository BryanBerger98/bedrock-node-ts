"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_all_users_interactor_1 = __importDefault(require("./get-all-users.interactor"));
const login_user_interactor_1 = __importDefault(require("./login-user.interactor"));
const register_user_interactor_1 = __importDefault(require("./register-user.interactor"));
class AuthInteractors {
    constructor(usersRepository, passwordsService, tokensService) {
        this.usersRepository = usersRepository;
        this.passwordsService = passwordsService;
        this.tokensService = tokensService;
        this.registerUser = new register_user_interactor_1.default(this.usersRepository, this.passwordsService);
        this.loginUser = new login_user_interactor_1.default(this.usersRepository, this.passwordsService, this.tokensService);
        this.getAllUsers = new get_all_users_interactor_1.default(this.usersRepository);
    }
}
exports.default = AuthInteractors;
