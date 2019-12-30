import {authRouter} from "./auth.router";

export function loadRouters(server) {
    server.use('/auth', authRouter)
}

export function asyncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next)
            .catch(next)
    }
}