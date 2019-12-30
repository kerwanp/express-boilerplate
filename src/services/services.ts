import { NextFunction, Response } from 'express'
import { Request } from 'express-serve-static-core'
import { AuthService } from './auth.service'

export function serviceMiddleware(req: Request, res: Response, next: NextFunction) {
    req.services.authService = new AuthService()
    next()
}