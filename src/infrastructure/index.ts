import MongoDB from "./mongo";

export default class Infrastructure {

    database;

    constructor(options: {database: 'mongo' | 'postgres'}) {
        switch (options.database) {
            case 'mongo':
                this.database = new MongoDB();
                break;
            case 'postgres':
                this.database = new MongoDB();
                break;
            default:
                this.database = new MongoDB();
                break;
        }
    }

}