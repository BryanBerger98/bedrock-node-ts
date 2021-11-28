import Interactor from "../../../interfaces/interactor.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class GetAllUsersInteractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository
    ) {}

    execute(): Promise<UserEntity[]> {
        return new Promise((resolve, reject) => {
            this.usersRepository.getAllUsers().then(resolve).catch(reject);
        });
    }

}