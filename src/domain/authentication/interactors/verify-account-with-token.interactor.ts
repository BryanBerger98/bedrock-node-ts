import TokenEntity from "../interfaces/token-entity.interface";
import TokensRepository from "../interfaces/tokens-repository.interface";
import TokensService from "../interfaces/tokens-service.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class VerifyAccountWithTokenInteractor {

    constructor(
        private usersRepository: UsersRepository,
        private tokensRepository: TokensRepository,
        private tokensService: TokensService) { }

    async execute(token: string): Promise<any> {
        try {
            const tokenEntity: TokenEntity = await this.tokensRepository.getToken(token);
            if (!tokenEntity) throw new Error('Invalid token');
            const jwtPayload = await this.tokensService.verifyToken(tokenEntity.token);
            const user = await this.usersRepository.getUserById(jwtPayload.id);
            if (!user) throw new Error('User does not exists');
            if (user.email_verified) {
                await this.tokensRepository.deleteToken(tokenEntity);
                throw new Error('Account already verified')
            };
            const u = await this.usersRepository.updateUser({id: jwtPayload.id, email_verified: true});
            const tk = await this.tokensRepository.deleteToken(tokenEntity);
            return {message: 'Account verified'};
        } catch (error) {
            throw error;
        }
    }

}