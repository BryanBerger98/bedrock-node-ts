import CreateTokenDto from "../dto/create-token.dto";
import TokenEntity from "./token-entity.interface";
import UserEntity from "./user-entity.interface";

export default interface TokensRepository {
    createToken(token: CreateTokenDto): Promise<TokenEntity>;
    getToken(token: string): Promise<TokenEntity>;
    deleteToken(token: TokenEntity): Promise<TokenEntity>;
    deleteExpiredTokens(): Promise<any>;
}