import {authRouter} from "./auth.router";
import * as express from 'express';
import {NextFunction, Request} from "express";

export function loadRouters(server: express.Express) {
    server.use('/auth', authRouter)
}

export function asyncWrapper(callback: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        callback(req, res, next)
            .catch(next)
    }
}