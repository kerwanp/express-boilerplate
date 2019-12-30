import { NextFunction, Request, Response } from 'express'

export function dumbMiddleware(req: Request, res: Response, next: NextFunction) {
    req.services = { }
    req.storage = { }
    next()
}