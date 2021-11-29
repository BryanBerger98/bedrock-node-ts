import TokensServiceInterface, { TokenAction } from "../domain/authentication/interfaces/tokens-service.interface";
import UserEntity from "../domain/authentication/interfaces/user-entity.interface";
import jwt from "jsonwebtoken";
import config from '../environment/env.config';

export default class TokensService implements TokensServiceInterface {

    createToken(user: UserEntity, expirationDate: Date | number, action: TokenAction) {
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            exp: expirationDate ? expirationDate : Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
            action 
        }, <string>config.JWT_SECRET);
        return token;
    }

    verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, <string>config.JWT_SECRET, (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            });
        });
    }

}