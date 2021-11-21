import express, { Request, Response } from 'express';
import AuthInteractors from '../../domain/authentication/interactors';
import UserEntity from '../../domain/authentication/interfaces/user-entity.interface';
import Controller from '../../interfaces/controller.interface';

export default class AuthController implements Controller {

    public path = '/auth';
    public router = express.Router();

    constructor(private authInteractors: AuthInteractors) {
        this.initializeRoutes();
    }

    initializeRoutes(): void {

        this.router.post('/', this.registerUser.bind(this));
        this.router.get('/', this.getAllUsers.bind(this));

    }

    registerUser(req: Request, res: Response): void {
        this.authInteractors.registerUser.execute(req.body)
            .then((response: UserEntity) => res.status(201).json(response))
            .catch((error: Error) => res.status(500).json(error.message));
    }

    getAllUsers(req: Request, res: Response): void {
        this.authInteractors.getAllUsers.execute()
            .then((response: UserEntity[]) => res.status(200).json(response))
            .catch((error: Error) => res.status(500).json(error.message));
    }

}