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
            if (!userCredentials) {
                reject(new Error('Credentials are missing'));
            }
            if (userCredentials && !userCredentials.password
                || userCredentials && userCredentials.password === ''
                || userCredentials && !userCredentials.email
                || userCredentials && userCredentials.email === '') {
                reject(new Error('At least an email and a password must be provided'));
            }
            this.passwordsService.hashPassword(userCredentials.password)
            .then(hashedPassword => {
                userCredentials.password = hashedPassword; 
                this.usersRepository.createUser(userCredentials).then(resolve).catch(reject);
            })
            .catch(reject);
        });
    }

}