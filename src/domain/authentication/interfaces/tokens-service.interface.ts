import UserEntity from "./user-entity.interface";

export type TokenAction = 'authentication' | 'reset_password' | 'account_verification';

export default interface TokensService {
    createToken(user: UserEntity, expirationDate: Date | number, action: TokenAction): string;
}