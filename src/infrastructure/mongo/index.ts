import { connect } from "mongoose";
import TokensRepository from "./repositories/tokens.repository";
import UsersRepository from "./repositories/users.repository";

export default class MongoDB {

    usersRepository = new UsersRepository();
    tokensRepository = new TokensRepository();

    constructor(private dbURI: string) {}

    run(): Promise<void> {
        return new Promise((resolve, reject) => {
            connect(this.dbURI)
            .then(() => {
                console.log('Mongo DB connected successfully');
            }).catch(reject);
        });
    }
      

}