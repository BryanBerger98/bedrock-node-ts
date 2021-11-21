import { connect } from "mongoose";
import UsersRepository from "./repositories/users.repository";

export default class MongoDB {

    usersRepository = new UsersRepository();

    constructor() {}

    run(): Promise<void> {
        return new Promise((resolve, reject) => {
            connect('mongodb://localhost:27017/bedrock-node')
            .then(() => {
                console.log('Mongo DB connected successfully');
            }).catch(reject);
        });
    }
      

}