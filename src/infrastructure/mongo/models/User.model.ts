import { model, Schema } from "mongoose";
import UserEntity from "../../../domain/authentication/interfaces/user-entity.interface";

const schema = new Schema<UserEntity>({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true
    },
    email_verified: {
        type: String,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    phone_number: {
        type: String
    },
    photo_url: {
        type: String
    },
    disabled: {
        type: Boolean,
        default: false
    },
    provider_data: {
        type: String
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = model<UserEntity>('User', schema);

export default UserModel;