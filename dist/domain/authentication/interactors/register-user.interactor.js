"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterUserInteractor {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute(userCredentials) {
        return new Promise((resolve, reject) => {
            this.usersRepository.createUser(userCredentials).then(resolve).catch(reject);
        });
    }
}
exports.default = RegisterUserInteractor;
