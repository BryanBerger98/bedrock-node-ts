import TokensRepository from "../../../infrastructure/mongo/repositories/tokens.repository";
import EmailsService from "../interfaces/emails-service.interface";
import TokensService from "../interfaces/tokens-service.interface";
import UserEntity from "../interfaces/user-entity.interface";

export default class SendAccountVerificationEmailInteractor {

    constructor(
        private tokensRepository: TokensRepository,
        private tokensService: TokensService,
        private emailsService: EmailsService) { }

    execute(currentUser: UserEntity): Promise<any> {
        return new Promise((resolve, reject) => {
            const expDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24);
            const token = this.tokensService.createToken(currentUser, expDate, 'account_verification');
            this.tokensRepository.createToken({token, action: 'account_verification', expiration_date: new Date(expDate * 1000)})
            .then(savedToken => {
                this.emailsService.sendAccountVerificationEmail(currentUser, savedToken)
                .then(resolve).catch(reject);
            }).catch(reject);
        });
    }
}