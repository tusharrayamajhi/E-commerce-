/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class vendorLogin{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string
}