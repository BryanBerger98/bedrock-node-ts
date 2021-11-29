import TokenEntity from "../interfaces/token-entity.interface";

export default class Token implements TokenEntity {

    public id: string;
    public token: string;
    public action: 'authentication' | 'reset_password' | 'account_verification';
    public expiration_date: Date;
    public created_on: Date;

    constructor(token: TokenEntity) {
        this.id = token.id;
        this.token = token.token;
        this.action = token.action;
        this.expiration_date = token.expiration_date;
        this.created_on = token.created_on ? token.created_on : new Date();
    }

}