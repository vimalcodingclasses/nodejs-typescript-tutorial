import { Exclude } from "class-transformer";

export class CreateUserResponse {
    public firstName!: string;

    public lastName!: string;

    public email!: string;

    @Exclude()
    public password!: string;

    @Exclude()
    public createdAt!: Date;

    @Exclude()
    public updatedAt!: Date;
}