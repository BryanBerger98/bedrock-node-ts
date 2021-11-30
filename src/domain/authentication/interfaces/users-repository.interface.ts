import UpdateUserDto from "../dto/update-user.dto";
import UserCredentials from "./user-credentials.interface";
import UserEntity from "./user-entity.interface";

export default interface UsersRepository {
    createUser(user: UserCredentials | UserEntity): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    getUserById(userId: string): Promise<UserEntity>;
    getUserByIdWithPassword(userId: string): Promise<UserEntity>;
    getUserByEmail(userEmail: string): Promise<UserEntity>;
    deleteUser(userId: string): Promise<UserEntity>;
    updateUser(user: UpdateUserDto): Promise<UserEntity>;
    updateUserPassword(userId: string, newPassword: string): Promise<UserEntity>
}