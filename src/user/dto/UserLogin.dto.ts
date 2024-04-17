/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import {  IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UserLoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsString()
    password:string
}