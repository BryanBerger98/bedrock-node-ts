import Interactor from "../../../interfaces/interactor.interface";
import UserCredentials from "../interfaces/user-credentials.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class RegisterUserInteractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository
    ) {}

    execute(userCredentials: UserCredentials): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            this.usersRepository.createUser(userCredentials).then(resolve).catch(reject);
        });
    }

}