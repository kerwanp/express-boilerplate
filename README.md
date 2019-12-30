<center>
    [![CI Badge](https://github.com/kerwanp/express-boilerplate/workflows/CI/badge.svg)]
    [![Deps badge](https://david-dm.org/kerwanp/express-starter.svg)]
    
    **A simple base application to begin an Express & Typescript project**
</center>

# Express Starter

This project is a simple node app running with Express and Typescript.
It provides a base application with useful tools and folder architecture.

## Setup

```shell script
$ git clone git@github.com:kerwanp/express-boilerplate.git && cd express-boilerplate
$ npm install
$ npm run serve
```

## Features

### Winston

Winston is a powerful logger for Javascript.

More informations https://github.com/winstonjs/winston

Usage:
```typescript
app.logger.info(`Your message`)
```

### Express Winston

Express Winston provide a configurable Express middleware to log every requests.
You can find the configuration in the `src/middlewares/logger.middleware.ts` file.

More information: https://www.npmjs.com/package/express-winston

### Express Async Handler

Express does not handle Promise errors catching. You can use express-async-handler to handle errors sent from promise when using async/await.

Usage:
```typescript
import expressAsyncHandler = require("express-async-handler");

authRouter.get('/token', expressAsyncHandler(async (req, res) => {
    await req.services.authService.authenticate();
    res.send('Hello world')
}));
```

More information: https://www.npmjs.com/package/express-async-handler

### File structure

#### Routers

Every routes are stored under the directory `src/routers` with the name `*.router.ts`.
This file should export the router which is used by the server in `src/routers/routers.ts`.

Example:
```typescript
// src/routers/users.router.ts
export const userRouter = express.Router();
userRouter.get('/hello', (req, res) => {
    res.send('Hello world')
});
```

```typescript
// src/routers/routers.Ts
export function loadRouters(server) {
    server.use('/users', userRouter)
}
```
> We have now the route `POST /users/hello`

#### Middleware

You can add your Middleware in the folder `src/middleware` with the name `*.middleware.ts`.
Next, use it in the file `src/middleware/middleware.ts`.

Example:
```typescript
// src/middleware/hello.middleware.ts
export function helloMiddleware(req, res, next) {
    console.log('HELLO WORLD !');
    next()
}
```
```typescript
// src/middleware/hello.middleware.ts
export function loadPostMiddleware(server: express.Express) {
    server.use(helloMiddleware)
}
```
> This will console 'HELLO WORLD' after using the routers.

#### Services

Services are stored in the folder `src/services` with the name `*.service.ts`.
Then you can instantiate it and store it in the request in the file `src/services/services.ts` with this way, you can pass arguments such as a header to the constructor.

Usage:
```typescript
// src/services/auth.service.ts
export class AuthService {
    private token;
    constructor(token: string) {
        this.token = token;
    }
    getUser() {}
}
``` 
```typescript
// src/services/services.ts
export function serviceMiddleware(req: Request, res: Response, next: NextFunction) {
    req.services.authService = new AuthService(
        req.headers['Authorization']
    );
    next();
}
```
```typescript
// src/routers/auth.router.ts
export const authRouter = express.Router();
userRouter.get('/me', (req, res) => {
    res.send(
        req.services.authService.getUser()
    )
});
```

#### Dotenv
You can manage the configuration of your application by adding or editing the `src/.env` file. 
Then, simply use them as environment variables `process.env.DB_HOST`.