import AuthInteractors from "../domain/authentication/interactors";
import Infrastructure from "../infrastructure";
import AuthController from "./authentication";

export default class Controllers {

    private authInteractors = new AuthInteractors(this.infrastructure.database.usersRepository);
    public authController = new AuthController(this.authInteractors);

    constructor(private infrastructure: Infrastructure) {
        this.infrastructure.database.run().catch(console.error);
    }

}