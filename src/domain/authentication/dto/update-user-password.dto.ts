export default interface UpdatePasswordDto {
    userId: string;
    newPassword: string;
    oldPassword: string;
}