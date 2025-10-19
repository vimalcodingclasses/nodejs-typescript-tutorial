import 'reflect-metadata';
import { Body, Delete, Get, JsonController, Param, Post, Put, Req, Res, UseAfter } from 'routing-controllers';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';

import { UserService } from '../services/UserService';
import { CreateUserRequest } from '../dto/Request/CreateUserRequest';
import { CreateUserResponse } from '../dto/Response/CreateUserResponse';
import { ErrorHandlerMiddleware } from '../middlewares/ErrorHandlerMiddleware';

@JsonController('/users')
@UseAfter(ErrorHandlerMiddleware)
export class UserController {
    private userService: UserService;

    public constructor() {
        this.userService = new UserService;
    }

    @Get('/')
    public getAllUsers(@Req() req: any, @Res() res: any) {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    public getUserById(@Req() req: any, @Res() res: any, @Param('id') userId: any) {
        return this.userService.getUserById(userId);
    }

    @Post('/')
    public async saveUser(@Req() req: Request, @Res() res: Response, @Body() payload: CreateUserRequest): Promise<Response<CreateUserResponse>> {
        const result = await this.userService.saveUser(payload);
        return res.status(201).send(plainToInstance(CreateUserResponse, result));
    }

    @Put('/:id')
    public updateUser(@Req() req: any, @Res() res: any, @Param('id') userId: any, @Body() payload: any) {
        return this.userService.updateUser(userId, payload);
    }

    @Delete('/:id')
    public deleteUser(@Req() req: any, @Res() res: any, @Param('id') userId: any) {
        return this.userService.deleteUser(userId);
    }

    @Post('/login')
    public async login(@Req() req: Request, @Res() res: Response, @Body() payload: any): Promise<Response<any>> {
        const result = await this.userService.login(payload);
        return res.status(200).send(result);
    }

    @Post('/token/verify')
    public async verifyToken(@Req() req: Request, @Res() res: Response, @Body() payload: any): Promise<Response<any>> {
        const result = await this.userService.verifyToken(payload);
        return res.status(200).send(result);
    }
}
