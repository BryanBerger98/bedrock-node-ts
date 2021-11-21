import UsersRepositoryInterface from "../interfaces/users-repository.interface";
import GetAllUsersInteractor from "./get-all-users.interactor";
import RegisterUserInteractor from "./register-user.interactor";

export default class AuthInteractors {
    registerUser = new RegisterUserInteractor(this.usersRepository);
    getAllUsers = new GetAllUsersInteractor(this.usersRepository);
    constructor(
        private usersRepository: UsersRepositoryInterface
    ) {}
}