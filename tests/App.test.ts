import App from "../src/App";
import { Application } from "express";
import Connection from "../src/Mongo/Connection";

const OLD_ENV = process.env;

describe("App Suite", () => {
    beforeEach(() => {
        jest.resetModules() // this is important - it clears the cache
        process.env = { ...OLD_ENV };
        delete process.env.NODE_ENV;
        process.env.CONNECTION_STRING = "";
        Connection.prototype.connect = jest.fn().mockResolvedValue(true);
    });
    
    afterEach(() => {
        process.env = OLD_ENV;
    });
    
    test("Should initialize the application", async () => {
        const app : App = new App();
    
        await app.initialize();
        
        expect(app.getLogger()).not.toBeNull();
        expect(app.getExpressApplication()).not.toBeNull();
        expect(app.isRunning()).toBeFalsy();
        expect(app.getPort()).toBeNaN();
    });
    
    test("Should fail to start the appliaction becuase it has not been initialized", () => {
        const app : App = new App();
    
        expect(() => {
            app.start(8080);
        }).toThrow(new Error("Application must be initialized before starting"));
    });
    
    test("Should start the appliaction", async () => {
        const app : App = new App();
        await app.initialize();
        const express : Application = app.getExpressApplication();
        express.listen = jest.fn();
    
        app.start(8080);
        
        expect(app.getLogger()).not.toBeNull();
        expect(app.getServer()).not.toBeNull();
        expect(app.isRunning()).toBeTruthy();
        expect(app.getPort()).toEqual(8080);
    })
})