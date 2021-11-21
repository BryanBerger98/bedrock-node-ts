"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllUsersInteractor {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute() {
        return new Promise((resolve, reject) => {
            this.usersRepository.getAllUsers().then(resolve).catch(reject);
        });
    }
}
exports.default = GetAllUsersInteractor;
