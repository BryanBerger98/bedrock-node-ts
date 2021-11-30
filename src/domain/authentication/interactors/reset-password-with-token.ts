import ResetUserPasswordDto from "../dto/reset-user-password.dto";
import PasswordsService from "../interfaces/passwords-service.interface";
import TokenEntity from "../interfaces/token-entity.interface";
import TokensRepository from "../interfaces/tokens-repository.interface";
import TokensService from "../interfaces/tokens-service.interface";
import UsersRepository from "../interfaces/users-repository.interface";

export default class ResetPasswordWithTokenInteractor {

    constructor(
        private usersRepository: UsersRepository,
        private tokensRepository: TokensRepository,
        private tokensService: TokensService,
        private passwordsService: PasswordsService) { }

    async execute(newPasswordParams: ResetUserPasswordDto): Promise<any> {
        try {
            if (!newPasswordParams) {
                throw new Error('A password and token must be provided');
            }
            if (newPasswordParams && !newPasswordParams.password || newPasswordParams && newPasswordParams.password === '') {
                throw new Error('A password must be provided');
            }
            if (newPasswordParams && !newPasswordParams.token || newPasswordParams && newPasswordParams.token === '') {
                throw new Error('Invalid token');
            }
            const tokenEntity: TokenEntity = await this.tokensRepository.getToken(newPasswordParams.token);
            if (!tokenEntity) throw new Error('Invalid token');
            const jwtPayload = await this.tokensService.verifyToken(tokenEntity.token);
            const user = await this.usersRepository.getUserById(jwtPayload.id);
            if (!user) throw new Error('User does not exists');
            const newHashedPassword = await this.passwordsService.hashPassword(newPasswordParams.password)
            await this.usersRepository.updateUserPassword(user.id, newHashedPassword);
            await this.tokensRepository.deleteToken(tokenEntity);
            return {message: 'Password updated'};
        } catch (error) {
            throw error;
        }
    }

}