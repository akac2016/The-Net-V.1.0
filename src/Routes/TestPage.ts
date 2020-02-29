import App from "../App";
import Router from "./Router";
import { Request, Response } from "express";



export default class  TestPage extends Router {

    // adds all routes to the routeHandler
    public configureRoutes() : void {
        this.routeHandler.get("/", this.handlePing);
    }

    // handles a ping to check the state of the server
    public handlePing(request : Request, response : Response) {
        response.send({
            running_test: App.getContext().isRunning()
        }).status(200);
    }
}