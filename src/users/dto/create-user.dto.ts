import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: 'Please Write Correct Email!'})
    @IsNotEmpty({message: 'Email Cannot Empty!'})
    email: string;

    @IsNotEmpty({
        message: 'Password Cannot Empty!',
    })
    password: string;


    name: string;
    address: string;
}
