import UserCredentials from "./user-credentials.interface";
import UserEntity from "./user-entity.interface";

export default interface UsersRepository {
    createUser(user: UserCredentials | UserEntity): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
}