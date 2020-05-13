import LoggerConfiguration from "../../src/Logger/LoggerConfiguration";
import Express from "express";

test("Gets a logger", () => {
    const configuration : LoggerConfiguration = new LoggerConfiguration(Express());

    expect(configuration.getLogger()).not.toBeNull();
})