import { CreateUserRequest } from "../dto/Request/CreateUserRequest";
import { CreateUserResponse } from "../dto/Response/CreateUserResponse";
import { UserRepository } from "../repositories/UserRepository";
import logger from "../../utils/logger";

export class UserService {
    private userRepository: UserRepository;

    public constructor() {
        this.userRepository = new UserRepository();
    }
    public getAllUsers() {
        return this.userRepository.getAllUsers();
    }

    public getUserById(userId: any) {
        return this.userRepository.getUserById(userId);
    }

    public async saveUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
        return await this.userRepository.saveUser(payload);
    }

    public updateUser(userId: any, payload: any) {
        return this.userRepository.updateUser(userId, payload);
    }

    public deleteUser(userId: any) {
        return this.userRepository.deleteUser(userId);
    }
}
