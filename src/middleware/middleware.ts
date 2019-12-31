import * as express from 'express'
import { dumbMiddleware } from './dumb.middleware'
import { loggerMiddleware } from './logger.middleware'

export function loadPreMiddleware(server: express.Express) {
    server.use(loggerMiddleware)
    server.use(dumbMiddleware)
}

export function loadPostMiddleware(server: express.Express) { }
