import AuthInteractors from "../domain/authentication/interactors";
import Infrastructure from "../infrastructure";
import PasswordsService from "../services/passwords.service";
import TokensService from "../services/tokens.service";
import AuthController from "./auth.controller";

export default class Controllers {

    private passwordsService = new PasswordsService();
    private tokensService = new TokensService();
    private authInteractors = new AuthInteractors(this.infrastructure.database.usersRepository, this.passwordsService, this.tokensService);
    public authController = new AuthController(this.authInteractors);

    constructor(private infrastructure: Infrastructure) {
        this.infrastructure.database.run().catch(console.error);
    }

}