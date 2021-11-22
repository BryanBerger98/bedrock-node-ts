"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../models/User.model"));
class UsersRepository {
    createUser(user) {
        return new Promise((resolve, reject) => {
            const newUser = new User_model_1.default(user);
            newUser.save().then(resolve).catch(reject);
        });
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            User_model_1.default.find({}, { password: 0 }).then(resolve).catch(reject);
        });
    }
    getUserById(userId) {
        return new Promise((resolve, reject) => {
            User_model_1.default.findById(userId, { password: 0 })
                .then(user => resolve(user)).catch(reject);
        });
    }
    getUserByEmail(userEmail) {
        return new Promise((resolve, reject) => {
            User_model_1.default.findOne({ email: userEmail })
                .then(user => resolve(user)).catch(reject);
        });
    }
}
exports.default = UsersRepository;
