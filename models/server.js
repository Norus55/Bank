import express, { json } from 'express'
import { dbConnect } from "../database/config.js";
import AccountRoute from '../routes/AccountRoute.js'

class Server {
    constructor() {
        this.app = express();
        this.pathAccount = '/accounts'

        this.route();
        this.dbConnection();
        this.listen();
    }
    async dbConnection() {
        await dbConnect();
    }

    route() {
        this.app.use(json())
        this.app.use(this.pathAccount, AccountRoute)
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);

        })
    }
}

export default Server