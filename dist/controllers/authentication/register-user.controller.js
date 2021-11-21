"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterUserController {
    constructor({ registerUser }) {
        return (req, res) => {
            registerUser.execute(req.body)
                .then((response) => res.status(201).json(response))
                .catch((error) => res.status(500).json(error.message));
        };
    }
}
exports.default = RegisterUserController;
