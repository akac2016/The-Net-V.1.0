import App from "../App";
import Router from "./Router";
import { Request, Response } from "express";
import Mongoose from "mongoose";
import {Interview} from "../Schemas/Interview";

export default class InterviewRouter extends Router {
    // adds all routes to the routeHandler
    public configureRoutes() : void {
        this.routeHandler.get("/:id", this.getInterview);
    }

    // handles a ping to check the state of the server
    public getInterview(request : Request, response : Response) {

        const PARAM_ID: string = "id";
        if (typeof request.params[PARAM_ID] === "undefined" || request.params[PARAM_ID] === null) {
            response.sendStatus(404);
            return;
        }

        var id = request.params[PARAM_ID];

        Interview.findById(id).lean().exec(function(err, intv) {

            return response.send(JSON.stringify(intv))

        });



    response.send("Displaying interview with id " + request.params.id);
    }
}