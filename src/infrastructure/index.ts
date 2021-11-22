import MongoDB from "./mongo";

export default class Infrastructure {

    database;

    constructor(options: {database: 'mongo' | 'postgres', dbURI: string}) {
        switch (options.database) {
            case 'mongo':
                this.database = new MongoDB(options.dbURI);
                break;
            case 'postgres':
                this.database = new MongoDB(options.dbURI);
                break;
            default:
                this.database = new MongoDB(options.dbURI);
                break;
        }
    }

}