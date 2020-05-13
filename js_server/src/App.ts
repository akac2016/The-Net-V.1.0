import Express from "express";
import LoggerConfiguration from "./Logger/LoggerConfiguration";
import Winston from "winston";
import BodyParser from "body-parser";
import { Server } from "http";
import RoutingTable from "./Routes/RoutingTable";
import Router from "./Routes/Router";
import Connection from "./Mongo/Connection";

export default class App {
    private express : Express.Application;
    private logger : Winston.Logger | null;
    private server : Server | null;
    private started : boolean;
    private port : number;
    private initialized : boolean;
    private routingTable : RoutingTable;
    private connection : Connection;

    constructor() {
        // Create an express application
        this.express = Express();
        // Set the state of the application to down
        this.started = false;
        this.initialized = false;
        this.logger = null;
        this.server = null;
        this.port = NaN;
        this.routingTable = new RoutingTable();
        this.connection = new Connection(this);

        this.handleListen = this.handleListen.bind(this);
    }

    public async initialize() {
        this.initialized = true;
        // Create a Winston Logger and use it in middleware to log
        // incoming HTTP requests, method, and meta data
        const loggerConfiguration : LoggerConfiguration = new LoggerConfiguration(this.express);
        loggerConfiguration.initialize();
        this.logger = loggerConfiguration.getLogger();

        // Initialize mongoose connection
        if (process.env.CONNECTION_STRING === undefined) {
            this.logger.error("Connection string to mongo database is not configured in system environment");
            process.exit();
        } else {
            await this.connection.connect(process.env.CONNECTION_STRING)
        }

        // Initialize body parsing of requests
        this.express.use(BodyParser.urlencoded({ extended: false }));
        this.express.use(BodyParser.json());

        // Configures all routes in the routing table
        this.routingTable.getTable().forEach((router : Router, baseUrl : string) => {
            router.configureRoutes();
            this.express.use(baseUrl, router.getExpressRouter());
        })
    }

    // Tell the application to listen on the port 
    // defined in the environment variables and 
    // log when the application has begun listening.
    public start(port : number) {
        if (!this.started && this.initialized) {
            this.port = port;
            this.started = true;
            this.server = this.express.listen(port, this.handleListen);
        }
        if (!this.initialized) {
            throw new Error("Application must be initialized before starting");
        }
    }

    // Handles when the application successfuly starts on a given port
    private handleListen() {
        if (this.logger === null) {
            throw new Error("Logger not initialized before starting the server");
        } else {
            this.logger.info(`Starting server on port ${process.env.PORT}`);
        }
    }

    // Returns the instance of the logger being used if it is initialized
    public getLogger() : Winston.Logger {
        if (this.logger === null) {
            throw new Error("Logger has not been initialized yet");
        }
        return this.logger;
    }

    // Gets the http server instance if it is initialized
    public getServer() : Server {
        if (this.server === null) {
            throw new Error("Server has not been initialized yet");
        }
        return this.server;
    }

    // Get the reference to the express application that powers the web server
    public getExpressApplication() : Express.Application {
        return this.express;   
    }

    // Checks if the application is running
    public isRunning() {
        return this.started;
    }

    // Gets the port the application is running on
    public getPort() {
        return this.port;
    }

    public static getContext() {
        return context;
    }
}

const context = new App();