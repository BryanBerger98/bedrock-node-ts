import CreateTokenDto from "../../../domain/authentication/dto/create-token.dto";
import TokenEntity from "../../../domain/authentication/interfaces/token-entity.interface";
import TokensRepositoryInterface from "../../../domain/authentication/interfaces/tokens-repository.interface";
import TokenModel from "../models/Token.model";

export default class TokensRepository implements TokensRepositoryInterface {

    constructor() {}

    createToken(token: CreateTokenDto): Promise<TokenEntity> {
        return new Promise((resolve, reject) => {
            const newToken = new TokenModel(token);
            newToken.save().then(resolve).catch(reject);
        });
    }

    getToken(token: string): Promise<TokenEntity> {
        return new Promise((resolve, reject) => {
            TokenModel.findOne({token})
            .then(tokenEntity => resolve(tokenEntity as TokenEntity)).catch(reject);
        });
    }

    deleteToken(token: TokenEntity): Promise<TokenEntity> {
        return new Promise((resolve, reject) => {
            TokenModel.findOneAndDelete({token: token.token})
            .then(deletedToken => resolve(deletedToken as TokenEntity)).catch(reject);
        });
    }

    deleteExpiredTokens(): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    }

}