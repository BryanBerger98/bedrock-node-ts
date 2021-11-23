import Interactor from "../../../interfaces/interactor.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class UpdateAccountInteractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository
    ) {}

    execute(user: UserEntity): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            this.usersRepository.updateUser(user).then(resolve).catch(reject);
        });
    }

}