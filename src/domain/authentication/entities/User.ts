import UserEntity from "../interfaces/user-entity.interface";

export default class User implements UserEntity {

    public id: string;
    public email: string;
    public email_verified: boolean;
    public password: string;
    public username: string;
    public photo_url: string;
    public phone_number: string;
    public disabled: boolean;
    public provider_data: string;
    public created_on: Date;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.email = user.email;
        this.email_verified = user.email_verified ? user.email_verified : false;
        this.password = user.password;
        this.username = user.username ? user.username : '';
        this.photo_url = user.photo_url ? user.photo_url : '';
        this.phone_number = user.phone_number ? user.phone_number : '';
        this.disabled = user.disabled ? user.disabled : false;
        this.provider_data = user.provider_data ? user.provider_data : '';
        this.created_on = user.created_on ? user.created_on : new Date();
    }

}