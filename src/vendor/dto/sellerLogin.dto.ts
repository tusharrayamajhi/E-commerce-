/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"


export class SellerLoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    password:string
}