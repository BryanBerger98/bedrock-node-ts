import express, { Request, Response } from 'express';
import AuthInteractors from '../domain/authentication/interactors';
import UserEntity from '../domain/authentication/interfaces/user-entity.interface';
import Controller from '../interfaces/controller.interface';
import passport from 'passport';

export default class AuthController implements Controller {

    public path = '/auth';
    public router = express.Router();

    constructor(private authInteractors: AuthInteractors) {
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.post('/register', this.registerUser.bind(this));
        this.router.post('/login', this.loginUser.bind(this));
        this.router.get('/current', passport.authenticate('jwt', {session: false}), this.getCurrentUser.bind(this));
        this.router.get('/', this.getAllUsers.bind(this));
    }

    registerUser(req: Request, res: Response): void {
        this.authInteractors.registerUser.execute(req.body)
        .then((response: UserEntity) => res.status(201).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    loginUser(req: Request, res: Response): void {
        this.authInteractors.loginUser.execute(req.body)
        .then((response: {user: UserEntity, token: string}) => {
            res.cookie('access_token', response.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }).status(200).json(response)
        })
        .catch((error: Error) => res.status(500).json(error.message));
    }

    getAllUsers(req: Request, res: Response): void {
        this.authInteractors.getAllUsers.execute()
        .then((response: UserEntity[]) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    getCurrentUser(req: Request, res: Response): void {
        this.authInteractors.getCurrentUser.execute(req.user as UserEntity)
        .then((response: UserEntity) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

}