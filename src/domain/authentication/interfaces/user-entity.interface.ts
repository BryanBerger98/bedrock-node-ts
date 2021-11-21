export default interface UserEntity {
    id: string;
    email: string;
    email_verified?: boolean;
    password?: string;
    username?: string;
    photo_url?: string;
    phone_number?: string;
    disabled?: boolean;
    provider_data?: string;
    created_on?: Date;
}