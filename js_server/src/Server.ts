#!/usr/bin/env node
/**
 * Module dependencies.
 */
import App from "./App";
import { config as ConfigureEnvironment } from "dotenv";
import { Server } from "http";
const AppContext = App.getContext();
ConfigureEnvironment();

/**
 * Get port from environment and store in Express.
 */
let argPort = '8080';
if (process.argv.length >= 2) {
    argPort = process.argv[2];
}
let port : number = normalizePort(process.env.PORT || argPort || '8080');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val : any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Initialize Application
 */
AppContext.initialize().then(() => {
    /**
     * Start Application
     */
    AppContext.start(port);
    const server : Server = AppContext.getServer();
    server.on("error", onError);
}).catch((error) => {
    /**
     * Failed to initialize application
     */
    throw error;
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error : any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}