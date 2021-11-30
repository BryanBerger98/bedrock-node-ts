import TokenEntity from "./token-entity.interface";
import UserEntity from "./user-entity.interface";

export default interface EmailsService {
    sendResetPasswordEmail(user: UserEntity, token: TokenEntity): Promise<any>;
    sendAccountVerificationEmail(user: UserEntity, token: TokenEntity): Promise<any>;
}