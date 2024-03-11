/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class ForgotpasswordChangeDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    OTP:string

    @ApiProperty()
    @IsNotEmpty()
    newPassword:string
}