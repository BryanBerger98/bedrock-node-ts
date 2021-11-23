import express, { Request } from 'express';
import config from '../environment/env.config';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import UserEntity from '../domain/authentication/interfaces/user-entity.interface';
import UserModel from '../infrastructure/mongo/models/User.model';
const JwtStrategy = passportJwt.Strategy;

export default class PassportMiddleware {

    private readonly app: express.Application;
    private jwtStrategy = new JwtStrategy({
        jwtFromRequest: this.cookieExtractor,
        secretOrKey: config.JWT_SECRET
    }, (jwt_payload, next) => {
        UserModel.findOne({ _id: jwt_payload.id }, (err: Error, user: UserEntity) => {
            if (err) {
                return next(err, false);
            }
            if (user) {
                if (user.disabled) return next(new Error('Your account is disabled'), false);
                return next(null, user);
            } else {
                return next(null, false);
            }
        });
    });

    constructor() {
        this.app = express();
        this.init = this.init.bind(this);
    }

    init() {
        this.app.use(passport.initialize());
        passport.use(this.jwtStrategy);
        return this.app;
    }

    private cookieExtractor (req: Request) {
        const token = req && req.cookies ? req.cookies.access_token : null;
        return token;
    }

}