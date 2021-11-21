"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
const UserModel = (0, mongoose_1.model)('User', schema);
exports.default = UserModel;
