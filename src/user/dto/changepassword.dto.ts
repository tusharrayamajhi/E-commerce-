/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class ChangePasswordDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newPassword:string
}