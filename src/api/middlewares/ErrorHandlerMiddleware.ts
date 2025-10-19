import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err?: any) => any): void {
        response.status(error?.code || 500).send(error);
        next();
    }
}