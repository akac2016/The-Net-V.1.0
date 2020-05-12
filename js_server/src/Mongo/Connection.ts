import Mongoose from "mongoose";
import App from "../App";

export default class Connection {
    private appContext : App;

    constructor(app : App) {
        this.appContext = app;
    }

    async connect(connectionUrl: string) {
        const logger = this.appContext.getLogger();
        try {
            // Connect to mongo
            await Mongoose.connect(connectionUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            logger.info("Connected to mongo database");
        } catch (error) {
            // Handle failed connection
            logger.error(error.message);
            process.exit();
        }
    }
}