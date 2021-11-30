export default interface UpdateUserDto {
    id: string;
    email?: string;
    email_verified?: boolean;
    username?: string;
    photo_url?: string;
    phone_number?: string;
    disabled?: boolean;
    provider_data?: string;
}
