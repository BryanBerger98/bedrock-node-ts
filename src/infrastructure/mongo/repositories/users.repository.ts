import UserCredentials from "../../../domain/authentication/interfaces/user-credentials.interface";
import UserEntity from "../../../domain/authentication/interfaces/user-entity.interface";
import UsersRepositoryAdapter from "../adapters/users-repository.adapter";
import UserModel from "../models/User.model";

export default class UsersRepository implements UsersRepositoryAdapter {

    createUser(user: UserEntity | UserCredentials): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            const newUser = new UserModel(user);
            newUser.save().then(resolve).catch(reject);
        });
    }

    getAllUsers(): Promise<UserEntity[]> {
        return new Promise((resolve, reject) => {
            UserModel.find({}, {password: 0}).then(resolve).catch(reject);
        });
    }

}