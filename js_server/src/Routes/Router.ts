import Express from "express"

export default abstract class Router {
    // Instance of the express router
    protected routeHandler : Express.IRouter;

    constructor() {
        this.routeHandler = Express.Router();
    }

    // Configures all routes on the express route handler
    public abstract configureRoutes() : void;

    // Gets an instance of the express router
    public getExpressRouter() : Express.IRouter {
        return this.routeHandler;
    }
}