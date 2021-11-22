"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
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
exports.default = User;
