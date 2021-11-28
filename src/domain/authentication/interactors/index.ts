import PasswordsService from "../interfaces/passwords-service.interface";
import TokensService from "../interfaces/tokens-service.interface";
import UsersRepository from "../interfaces/users-repository.interface";
import ChangeUserPasswordIneractor from "./change-user-password.interactor";
import DeleteAccountInteractor from "./delete-account.interactor";
import GetAllUsersInteractor from "./get-all-users.interactor";
import GetCurrentUserInteractor from "./get-current-user.interactor";
import LoginUserInteractor from "./login-user.interactor";
import RegisterUserInteractor from "./register-user.interactor";
import UpdateAccountInteractor from "./update-account.interactor";

export default class AuthInteractors {

    registerUser = new RegisterUserInteractor(this.usersRepository, this.passwordsService);
    loginUser = new LoginUserInteractor(this.usersRepository, this.passwordsService, this.tokensService);
    getAllUsers = new GetAllUsersInteractor(this.usersRepository);
    getCurrentUser = new GetCurrentUserInteractor(this.usersRepository);
    deleteAccount = new DeleteAccountInteractor(this.usersRepository);
    updateAccount = new UpdateAccountInteractor(this.usersRepository);
    changeUserPassword = new ChangeUserPasswordIneractor(this.usersRepository, this.passwordsService);

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService,
        private tokensService: TokensService
    ) {}

}