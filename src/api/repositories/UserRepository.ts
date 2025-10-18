import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

import { dataSource } from "../../db/data-source";
import { User } from "../models/User";
import { CreateUserRequest } from "../dto/Request/CreateUserRequest";
import { CreateUserResponse } from "../dto/Response/CreateUserResponse";

export class UserRepository extends MongoRepository<User> {
    public constructor() {
        super(User, dataSource.createEntityManager());
    }

    public async getAllUsers() {
        const allUsers = await this.find();
        return JSON.parse(JSON.stringify(allUsers));
    }

    public async getUserById(userId: any) {
        const fetchUserById = await this.findOne({
            select: ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
            where: { _id: new ObjectId(userId) }
        });
        return JSON.parse(JSON.stringify(fetchUserById));
    }

    public async saveUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
        console.log(payload);
        const newUser = this.create(payload);
        const savedUser = await this.save(newUser);
        return JSON.parse(JSON.stringify(savedUser));
    }

    public async updateUser(userId: any, payload: any) {
        const fetchUserById: any = await this.findOne({
            where: { _id: new ObjectId(userId) }
        });
        fetchUserById.firstName = payload.firstName;
        fetchUserById.lastName = payload.lastName;
        fetchUserById.email = payload.email;
        fetchUserById.password = payload.password;
        const updatedUser = await this.save(fetchUserById);
        return JSON.parse(JSON.stringify(updatedUser));
    }

    public async deleteUser(userId: any) {
        return await this.delete({ _id: new ObjectId(userId) });
    }
}