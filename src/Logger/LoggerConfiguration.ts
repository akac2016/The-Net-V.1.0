import { Application } from "express"
import Winston from "winston";
import WinstonMiddleware from "express-winston";

export default class LoggerConfiguration {
    private app : Application;

    constructor(app : Application) {
        this.app = app;
    }

    public initialize() {
        this.app.set('logger', this.createLogger());
        this.useLoggerInMiddleware();
    }

    public getLogger() : Winston.Logger {
        return this.app.get('logger');
    }

    private createLogger() : Winston.Logger {
        return Winston.createLogger({
            transports: [
                new Winston.transports.Console({
                    format: this.getFormat()
                })
            ]
        });
    }

    private getFormat() {
        return Winston.format.combine(
            Winston.format.colorize(),
            Winston.format.timestamp(),
            Winston.format.printf((info) => {
                const { timestamp: rawTimeStamp, level, message, ...args } = info;
                const timeStamp = rawTimeStamp.slice(0, 19).replace('T', ' ');
                return `${timeStamp} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
            }),
        )
    }

    private useLoggerInMiddleware() {
        this.app.use(WinstonMiddleware.logger({
            transports: [
              new Winston.transports.Console()
            ],
            format: this.getFormat(),
            meta: true,
            msg: "HTTP {{req.method}} {{req.url}}",
            expressFormat: true,
            colorize: true
        })); 
    }
}