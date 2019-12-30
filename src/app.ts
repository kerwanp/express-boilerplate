import { loadPostMiddleware, loadPreMiddleware } from '@middleware/middleware'
import { loadRouters } from '@routers/routers'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as winston from 'winston'

export class App {

    public readonly server: express.Express
    public readonly logger: winston.Logger

    constructor() {
        dotenv.config({ path: 'build/.env'})
        this.logger = winston.createLogger({
            level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            transports: [new winston.transports.Console()]
        })
        this.server = express()
    }

    init() {
        this.listen()
        loadPreMiddleware(this.server)
        loadRouters(this.server)
        loadPostMiddleware(this.server)
    }

    listen() {
        this.server.listen(process.env.EXPRESS_PORT, () => {
            this.logger.info(`Express server has started on http://${process.env.EXPRESS_HOST}:${process.env.EXPRESS_PORT}`)
        })
    }
}

export const app = new App()
app.init()