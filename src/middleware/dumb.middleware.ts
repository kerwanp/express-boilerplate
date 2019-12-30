export function dumbMiddleware(req, res, next) {
    req.services = {}
    req.storage = {}
    next()
}