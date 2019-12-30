import {AuthService} from "./auth.service";
import {Request} from "express-serve-static-core";
import {NextFunction, Response} from "express";

export function serviceMiddleware(req: Request, res: Response, next: NextFunction) {
    req.services.authService = new AuthService();
    next();
}