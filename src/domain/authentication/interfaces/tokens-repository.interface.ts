import TokenEntity from "./token-entity.interface";
import UserEntity from "./user-entity.interface";

export default interface TokensRepository {
    createToken(token: TokenEntity): Promise<TokenEntity>;
    getToken(token: TokenEntity): Promise<TokenEntity>;
    deleteToken(token: TokenEntity): Promise<TokenEntity>;
    deleteExpiredTokens(): Promise<any>;
}