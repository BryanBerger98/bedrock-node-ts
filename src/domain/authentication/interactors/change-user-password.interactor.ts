import Interactor from "../../../interfaces/interactor.interface";
import PasswordsService from "../interfaces/passwords-service.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class ChangeUserPasswordIneractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService
    ) {}

    execute(currentUser: UserEntity, {oldPassword, newPassword}: {oldPassword: string, newPassword: string}): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            this.usersRepository.getUserByIdWithPassword(currentUser.id)
            .then(user => {
                this.passwordsService.comparePassword(user.password, oldPassword)
                .then(result => {
                    if (!result) {
                        reject(new Error('Wrong password'));
                    }
                    this.passwordsService.hashPassword(newPassword)
                    .then(newHashedPassword => {
                        this.usersRepository.updateUser({...user, password: newHashedPassword}).then(resolve).catch(reject);
                    }).catch(reject);
                }).catch(reject);
            }).catch(reject);
        });
    }

}