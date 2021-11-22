export default interface PasswordsService {
    generatePassword(passwordLength: number): string;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, candidatePassword: string): Promise<boolean>;
}