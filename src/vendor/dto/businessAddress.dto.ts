/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BusinessAddressInfoDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    apartment: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    zipcode: string;
}