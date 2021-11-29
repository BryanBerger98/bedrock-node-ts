import TokenEntity from "../../../domain/authentication/interfaces/token-entity.interface";
import TokensRepositoryInterface from "../../../domain/authentication/interfaces/tokens-repository.interface";

export default class TokensRepository implements TokensRepositoryInterface {

    constructor() {}

    createToken(token: TokenEntity): Promise<TokenEntity> {
        return new Promise((resolve, reject) => {

        });
    }

    getToken(token: TokenEntity): Promise<TokenEntity> {
        return new Promise((resolve, reject) => {

        });
    }

    deleteToken(token: TokenEntity): Promise<TokenEntity> {
        return new Promise((resolve, reject) => {

        });
    }

    deleteExpiredTokens(): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    }

}