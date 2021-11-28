import Interactor from "../../../interfaces/interactor.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class UpdateAccountInteractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository
    ) {}

    execute(currentUser:UserEntity, user: UserEntity): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            this.usersRepository.updateUser({...user, id: currentUser.id}).then(resolve).catch(reject);
        });
    }

}