export default interface TokenEntity {
    id: string;
    token: string;
    action: 'authentication' | 'reset_password' | 'account_verification',
    expiration_date: Date;
    created_on?: Date;
}