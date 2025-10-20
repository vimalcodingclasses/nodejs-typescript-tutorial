import * as bcrypt from 'bcrypt';

import logger from "../../utils/logger";
import { CreateUserRequest } from "../dto/Request/CreateUserRequest";
import { CreateUserResponse } from "../dto/Response/CreateUserResponse";
import { UserRepository } from "../repositories/UserRepository";
import { JwtService } from "../../utils/JwtService";

export class UserService {
    private userRepository: UserRepository;
    private jwtService: JwtService;

    public constructor() {
        this.userRepository = new UserRepository();
        this.jwtService = new JwtService();
    }
    public getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    public getUserById(userId: any) {
        return this.userRepository.getUserById(userId);
    }

    public async saveUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
        try {
            return await this.userRepository.saveUser(payload);
        } catch (error) {
            logger.error('Error in saving user', error);
            throw {
                code: 400,
                message: 'Error in saving user',
                description: 'Error in saving user'
            }
        }

    }

    public async login(payload: any): Promise<any> {
        try {
            const verifyEmail = await this.userRepository.getUserByEmail(payload?.email);
            if (verifyEmail?.email !== payload?.email) {
                throw {
                    code: 400,
                    message: 'Invalid email',
                    description: 'Invalid email. pls check and try again'
                }
            }
            const verifyPassword = await bcrypt.compare(payload?.password, verifyEmail?.password);
            if (!verifyPassword) {
                throw {
                    code: 400,
                    message: 'Invalid password',
                    description: 'Invalid password. pls check and try again'
                }
            }
            const result = this.jwtService.generateToken(payload);
            return {
                token: result
            }
        } catch (error) {
            throw error;
        }
    }

    public async verifyToken(payload: any): Promise<any> {
        const result = this.jwtService.verifyToken(payload?.token);
        return result;
    }

    public updateUser(userId: any, payload: any) {
        return this.userRepository.updateUser(userId, payload);
    }

    public deleteUser(userId: any) {
        return this.userRepository.deleteUser(userId);
    }
}
