import PasswordsServiceInterface from '../domain/authentication/interfaces/passwords-service.interface';
import bcrypt from 'bcryptjs';

export default class PasswordsService implements PasswordsServiceInterface {

    constructor() {}

    generatePassword(passwordLength: number): string {
        const passwordCharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&-_/$*!?=.+^';
        let generatedPassword = '';
        for (let i = 0, n = passwordCharset.length; i < passwordLength; ++i) {
            generatedPassword += passwordCharset.charAt(Math.floor(Math.random() * n));
        }
        return generatedPassword;
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    comparePassword(password: string, candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, password);
    }

}
