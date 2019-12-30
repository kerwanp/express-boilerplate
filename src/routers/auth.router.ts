import * as express from 'express'
import expressAsyncHandler = require('express-async-handler')

export const authRouter = express.Router()

authRouter.get('/token', expressAsyncHandler(async (req, res) => {
    res.send('Hello world')
}))