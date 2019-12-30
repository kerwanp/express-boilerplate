import * as express from 'express'
import { authRouter } from './auth.router'

export function loadRouters(server: express.Express) {
    server.use('/auth', authRouter)
}

export function asyncWrapper(callback: Function) {
    return function (req: express.Request, res: express.Response, next: express.NextFunction) {
        callback(req, res, next)
            .catch(next)
    }
}