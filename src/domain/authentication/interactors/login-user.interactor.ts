import Interactor from "../../../interfaces/interactor.interface";
import PasswordsService from "../interfaces/passwords-service.interface";
import TokensService from "../interfaces/tokens-service.interface";
import UserCredentials from "../interfaces/user-credentials.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class LoginUserInteractor implements Interactor {

    constructor(
        private usersRepository: UsersRepository,
        private passwordsService: PasswordsService,
        private tokensService: TokensService
    ) {}

    execute(userCredentials: UserCredentials): Promise<{user: UserEntity, token: string}> {
        return new Promise((resolve, reject) => {
            if (!userCredentials) {
                reject(new Error('Credentials are missing'));
            }
            if (userCredentials && !userCredentials.email || userCredentials && userCredentials.email === '') {
                reject(new Error('An email address must be provided'));
            }
            if (userCredentials && !userCredentials.password || userCredentials && userCredentials.password === '') {
                reject(new Error('A password must be provided'));
            }
            this.usersRepository.getUserByEmail(userCredentials.email)
            .then((user: UserEntity) => {
                this.passwordsService.comparePassword(user.password, userCredentials.password)
                .then((doesMatch) => {
                    if (!doesMatch) {
                        reject(new Error('Wrong password'));
                    }
                    const expDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30);
                    const token = this.tokensService.createToken(user, expDate, 'authentication');
                    resolve({user, token});
                }).catch(reject);
            }).catch(reject);
        });
    }

}