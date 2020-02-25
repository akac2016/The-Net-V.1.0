import PingRouter from "./PingRouter";
import Router from "./Router";
import InterviewRouter from "./InterviewRouter"

export default class RoutingTable {
    // Table of all relative urls mapped to their routers
    private table : Map<string, Router>;

    constructor() {
        this.table = new Map<string, Router>();
        this.table.set('/ping', new PingRouter());
        this.table.set('/interview', new InterviewRouter());
    }

    // Gets the routing table
    public getTable() : Map<string, Router> {
        return this.table;
    }
}