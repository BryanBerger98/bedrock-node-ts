import Interactor from "../../../interfaces/interactor.interface";
import UpdatePasswordDto from "../dto/update-user-password.dto";
import PasswordsService from "../interfaces/passwords-service.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class ChangeUserPasswordIneractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService
    ) {}

    execute(updatePasswordParams: UpdatePasswordDto): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            if (updatePasswordParams && !updatePasswordParams.oldPassword || updatePasswordParams && updatePasswordParams.oldPassword === '') {
                reject(new Error('Old password must be provided'));
            }
            if (updatePasswordParams && !updatePasswordParams.newPassword || updatePasswordParams && updatePasswordParams.newPassword === '') {
                reject(new Error('New password must be provided'));
            }
            this.usersRepository.getUserByIdWithPassword(updatePasswordParams.userId)
            .then(user => {
                if (!user) {
                    reject(new Error('This user does not exist'));
                }
                this.passwordsService.comparePassword(user.password, updatePasswordParams.oldPassword)
                .then(result => {
                    if (!result) {
                        reject(new Error('Wrong password'));
                    }
                    this.passwordsService.hashPassword(updatePasswordParams.newPassword)
                    .then(newHashedPassword => {
                        this.usersRepository.updateUserPassword(user.id, newHashedPassword).then(resolve).catch(reject);
                    }).catch(reject);
                }).catch(reject);
            }).catch(reject);
        });
    }

}