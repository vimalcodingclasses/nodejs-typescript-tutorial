import { Get, JsonController, Req, Res, UseBefore } from "routing-controllers";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";

@JsonController('/dashboard')
@UseBefore(AuthorizationMiddleware)
export class DashboardController {
    @Get('/')
    public dashboard(@Req() req: any, @Res() res: any) {
        return { data: 'Dashboard page' };
    }
}
