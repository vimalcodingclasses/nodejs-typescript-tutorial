import 'reflect-metadata';
import { Body, Delete, Get, JsonController, Param, Post, Put, Req, Res, UseBefore } from 'routing-controllers';
import { Request, Response } from 'express';

import { UserService } from '../services/UserService';
import { CreateUserRequest } from '../dto/Request/CreateUserRequest';
import { CreateUserResponse } from '../dto/Response/CreateUserResponse';
import { plainToInstance } from 'class-transformer';
import { ErrorHandlerMiddleware } from '../middlewares/ErrorHandlerMiddleware';

@JsonController('/users')
@UseBefore(ErrorHandlerMiddleware)
export class UserController {
    private userService: UserService;

    public constructor() {
        this.userService = new UserService;
    }

    @Get('/')
    public getAllUsers(@Req() req: any, @Res() res: any) {
        console.log('get all users');
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    public getUserById(@Req() req: any, @Res() res: any, @Param('id') userId: any) {
        console.log('Get user by id');
        return this.userService.getUserById(userId);
    }

    @Post('/')
    public async saveUser(@Req() req: Request, @Res() res: Response, @Body() payload: CreateUserRequest): Promise<Response<CreateUserResponse>> {
        const result = await this.userService.saveUser(payload);
        return res.status(201).send(plainToInstance(CreateUserResponse, result));
    }

    @Put('/:id')
    public updateUser(@Req() req: any, @Res() res: any, @Param('id') userId: any, @Body() payload: any) {
        console.log('updating user');
        return this.userService.updateUser(userId, payload);
    }

    @Delete('/:id')
    public deleteUser(@Req() req: any, @Res() res: any, @Param('id') userId: any) {
        console.log('deleting user');
        return this.userService.deleteUser(userId);
    }
}
