import * as express from 'express'
import {serviceMiddleware} from "../services/services";
import {loggerMiddleware} from "./logger.middleware";
import {dumbMiddleware} from "./dumb.middleware";

export function loadPreMiddleware(server: express.Express) {
    server.use(loggerMiddleware);
    server.use(dumbMiddleware);
    server.use(serviceMiddleware);
}

export function loadPostMiddleware(server: express.Express) {}