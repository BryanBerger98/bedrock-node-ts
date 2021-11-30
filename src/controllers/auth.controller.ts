import express, { Request, Response } from 'express';
import AuthInteractors from '../domain/authentication/interactors';
import UserEntity from '../domain/authentication/interfaces/user-entity.interface';
import Controller from '../interfaces/controller.interface';
import passport from 'passport';
import UserCredentials from '../domain/authentication/interfaces/user-credentials.interface';
import UpdateUserDto from '../domain/authentication/dto/update-user.dto';
import UpdatePasswordDto from '../domain/authentication/dto/update-user-password.dto';
import ResetUserPasswordDto from '../domain/authentication/dto/reset-user-password.dto';

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
        this.router.delete('/account', passport.authenticate('jwt', {session: false}), this.deleteAccount.bind(this));
        this.router.put('/account', passport.authenticate('jwt', {session: false}), this.updateAccount.bind(this));
        this.router.put('/change-password', passport.authenticate('jwt', {session: false}), this.changeUserPassword.bind(this));
        this.router.get('/verify-account', passport.authenticate('jwt', {session: false}), this.sendAccountVerificationEmail.bind(this));
        this.router.post('/verify-account', passport.authenticate('jwt', {session: false}), this.verifyAccountWithToken.bind(this));
        this.router.post('/reset-password', passport.authenticate('jwt', {session: false}), this.sendResetPasswordEmail.bind(this));
        this.router.put('/reset-password', passport.authenticate('jwt', {session: false}), this.resetPasswordWithToken.bind(this));
    }

    registerUser(req: Request, res: Response): void {
        this.authInteractors.registerUser.execute(req.body as UserCredentials)
        .then((response: UserEntity) => res.status(201).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    loginUser(req: Request, res: Response): void {
        this.authInteractors.loginUser.execute(req.body as UserCredentials)
        .then((response: {user: UserEntity, token: string}) => {
            res.cookie('access_token', response.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }).status(200).json(response)
        })
        .catch((error: Error) => res.status(500).json(error.message));
    }

    getCurrentUser(req: Request, res: Response): void {
        this.authInteractors.getCurrentUser.execute(req.user as UserEntity)
        .then((response: UserEntity) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    deleteAccount(req: Request, res: Response): void {
        this.authInteractors.deleteAccount.execute(req.user as UserEntity)
        .then((response: UserEntity) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    updateAccount(req: Request, res: Response): void {
        this.authInteractors.updateAccount.execute(req.user as UserEntity, req.body as UpdateUserDto)
        .then((response: UserEntity) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    changeUserPassword(req: Request, res: Response): void {
        const currentUser = req.user as UserEntity;
        this.authInteractors.changeUserPassword.execute({userId: currentUser.id, ...req.body} as UpdatePasswordDto)
        .then((response: UserEntity) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    sendAccountVerificationEmail(req: Request, res: Response): void {
        this.authInteractors.sendAccountVerificationEmail.execute(req.user as UserEntity)
        .then((response: UserEntity) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    verifyAccountWithToken(req: Request, res: Response): void {
        this.authInteractors.verifyAccountWithToken.execute(req.body)
        .then((response: any) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message));
    }

    sendResetPasswordEmail(req: Request, res: Response): void {
        this.authInteractors.sendResetPasswordEmail.execute(req.body)
        .then((response: any) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message)); 
    }

    resetPasswordWithToken(req: Request, res: Response): void {
        this.authInteractors.resetPasswordWithToken.execute(req.body as ResetUserPasswordDto)
        .then((response: any) => res.status(200).json(response))
        .catch((error: Error) => res.status(500).json(error.message)); 
    }

}