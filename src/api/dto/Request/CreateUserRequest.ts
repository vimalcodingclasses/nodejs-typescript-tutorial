import { IsEmail, Length, MinLength } from "class-validator";

export class CreateUserRequest {
    @Length(3, 15, { message: 'First Name should be in between 3-15 length' })
    public firstName!: string;

    @Length(3, 15, { message: 'Last Name should be in between 3-15 length' })
    public lastName!: string;

    @IsEmail({}, { message: 'Email should be valid' })
    public email!: string;

    @MinLength(8, { message: 'Password should be min 8 charaters' })
    public password!: string;
}