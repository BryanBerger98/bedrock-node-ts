import UpdateUserDto from "../../../domain/authentication/dto/update-user.dto";
import UserCredentials from "../../../domain/authentication/interfaces/user-credentials.interface";
import UserEntity from "../../../domain/authentication/interfaces/user-entity.interface";
import UsersRepositoryInterface from "../../../domain/authentication/interfaces/users-repository.interface";
import UserModel from "../models/User.model";

export default class UsersRepository implements UsersRepositoryInterface {

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

    getUserById(userId: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            UserModel.findById(userId, {password: 0})
            .then(user => resolve(user as UserEntity)).catch(reject);
        });
    }

    getUserByEmail(userEmail: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            UserModel.findOne({email: userEmail})
            .then(user => resolve(user as UserEntity)).catch(reject);
        });
    }

    deleteUser(userId: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndDelete(userId)
            .then(user => resolve(user as UserEntity)).catch(reject);
        });
    }

    updateUser(userToUpdate: UpdateUserDto): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(userToUpdate.id, {$set: {...userToUpdate}}, {new: true})
            .then(user => resolve(user as UserEntity)).catch(reject);
        });
    }

    getUserByIdWithPassword(userId: string): Promise<UserEntity> {
        return new Promise((resolve, reject) => {
            UserModel.findById(userId)
            .then(user => resolve(user as UserEntity)).catch(reject);
        })
    }

}