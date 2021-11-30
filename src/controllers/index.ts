import AuthInteractors from "../domain/authentication/interactors";
import Infrastructure from "../infrastructure";
import EmailsService from "../services/emails.service";
import PasswordsService from "../services/passwords.service";
import TokensService from "../services/tokens.service";
import AuthController from "./auth.controller";

export default class Controllers {

    private passwordsService = new PasswordsService();
    private tokensService = new TokensService();
    private emailsService = new EmailsService();
    private authInteractors = new AuthInteractors(
        this.infrastructure.database.usersRepository,
        this.passwordsService,
        this.tokensService,
        this.infrastructure.database.tokensRepository,
        this.emailsService
    );
    public authController = new AuthController(this.authInteractors);

    constructor(private infrastructure: Infrastructure) {
        this.infrastructure.database.run().catch(console.error);
    }

}