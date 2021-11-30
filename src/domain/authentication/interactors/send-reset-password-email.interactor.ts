import TokensRepository from "../../../infrastructure/mongo/repositories/tokens.repository";
import ResetUserPasswordDto from "../dto/reset-user-password.dto";
import EmailsService from "../interfaces/emails-service.interface";
import TokensService from "../interfaces/tokens-service.interface";
import UserEntity from "../interfaces/user-entity.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class SendResetPasswordEmail {

    constructor(
        private tokensRepository: TokensRepository,
        private tokensService: TokensService,
        private emailsService: EmailsService,
        private usersRepository: UsersRepository) { }

    execute({email}: {email: string}): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!email || email && email === '') {
                reject(new Error('An email must be provided'));
            }
            this.usersRepository.getUserByEmail(email)
            .then(user => {
                if (!user) reject(new Error('User does not exist'));
                const expDate = Math.floor(Date.now() / 1000) + (60 * 60 * 2);
                const token = this.tokensService.createToken(user, expDate, 'reset_password');
                this.tokensRepository.createToken({token, action: 'reset_password', expiration_date: new Date(expDate * 1000)})
                .then(savedToken => {
                    this.emailsService.sendResetPasswordEmail(user, savedToken)
                    .then(resolve).catch(reject);
                }).catch(reject);
            }).catch(reject);
        });
    }
}