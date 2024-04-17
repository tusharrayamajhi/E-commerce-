/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class ForgotpasswordDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string
}