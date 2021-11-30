import Interactor from "../../../interfaces/interactor.interface";
import UpdateUserDto from "../dto/update-user.dto";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class UpdateAccountInteractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository
    ) {}

    execute(currentUser: UserEntity, user: UpdateUserDto): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            if (!user) {
                reject(new Error('Data to update are missing'));
            }
            this.usersRepository.updateUser({...user, id: currentUser.id}).then(resolve).catch(reject);
        });
    }

}