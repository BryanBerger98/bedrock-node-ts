"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterUserInteractor {
    constructor(usersRepository, passwordsService) {
        this.usersRepository = usersRepository;
        this.passwordsService = passwordsService;
    }
    execute(userCredentials) {
        return new Promise((resolve, reject) => {
            this.passwordsService.hashPassword(userCredentials.password)
                .then(hashedPassword => {
                userCredentials.password = hashedPassword;
                this.usersRepository.createUser(userCredentials).then(resolve).catch(reject);
            })
                .catch(reject);
        });
    }
}
exports.default = RegisterUserInteractor;
