/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string

    @ApiProperty()
    @IsString()
    middleName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string
}

