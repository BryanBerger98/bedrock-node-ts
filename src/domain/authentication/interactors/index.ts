import PasswordsService from "../interfaces/passwords-service.interface";
import TokensService from "../interfaces/tokens-service.interface";
import UsersRepository from "../interfaces/users-repository.interface";
import GetAllUsersInteractor from "./get-all-users.interactor";
import LoginUserInteractor from "./login-user.interactor";
import RegisterUserInteractor from "./register-user.interactor";

export default class AuthInteractors {

    registerUser = new RegisterUserInteractor(this.usersRepository, this.passwordsService);
    loginUser = new LoginUserInteractor(this.usersRepository, this.passwordsService, this.tokensService);
    getAllUsers = new GetAllUsersInteractor(this.usersRepository);

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService,
        private tokensService: TokensService
    ) {}

}