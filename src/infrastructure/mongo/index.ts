import { connect } from "mongoose";
import UsersRepository from "./repositories/users.repository";

export default class MongoDB {

    usersRepository = new UsersRepository();

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