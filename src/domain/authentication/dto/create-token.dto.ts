export default interface CreateTokenDto {
    token: string;
    action: 'authentication' | 'reset_password' | 'account_verification',
    expiration_date: Date;
}