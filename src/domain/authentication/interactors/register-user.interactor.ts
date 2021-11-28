import Interactor from "../../../interfaces/interactor.interface";
import PasswordsService from "../interfaces/passwords-service.interface";
import UserCredentials from "../interfaces/user-credentials.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class RegisterUserInteractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService
    ) {}

    execute(userCredentials: UserCredentials): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            this.passwordsService.hashPassword(userCredentials.password)
            .then(hashedPassword => {
                userCredentials.password = hashedPassword; 
                this.usersRepository.createUser(userCredentials).then(resolve).catch(reject);
            })
            .catch(reject);
        });
    }

}