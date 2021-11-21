import { Request, Response } from "express";
import UserEntity from "../../domain/authentication/interfaces/user-entity.interface";

export default class RegisterUserController {
    constructor({registerUser}: any) {
        return (req: Request, res: Response) => {
            registerUser.execute(req.body)
            .then((response: UserEntity) => res.status(201).json(response))
            .catch((error: Error) => res.status(500).json(error.message));
        }
    }
}