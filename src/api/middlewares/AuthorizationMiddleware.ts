import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { JwtService } from "../../utils/JwtService";

export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
    private jwtService: JwtService;

    public constructor() {
        this.jwtService = new JwtService();
    }

    async use(request: any, response: any, next: (err?: any) => any) {
        console.log(request?.headers);
        const { authorization } = request?.headers;
        await this.jwtService.verifyToken(authorization);
        next();
    }
}
