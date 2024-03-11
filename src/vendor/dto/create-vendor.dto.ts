/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateVendorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string
}
