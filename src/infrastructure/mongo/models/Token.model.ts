import { model, Schema } from "mongoose";
import TokenEntity from "../../../domain/authentication/interfaces/token-entity.interface";

const schema = new Schema<TokenEntity>({
    token: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    action: {
        type: String,
        required: true,
        enum: ['authentication', 'reset_password', 'account_verification']
    },
    expiration_date: {
        type: Date,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
});

const TokenModel = model<TokenEntity>('Token', schema);

export default TokenModel;