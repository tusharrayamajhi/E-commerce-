/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, Length } from "class-validator";


export class BusinessContactInfoDto{
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    primaryEmail?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    secondaryEmail: string;

    @ApiProperty()
    @IsOptional()
    @Length(10)
    phoneNumber: string;

    @ApiProperty()
    @IsOptional()
    @Length(10)
    alternateNumber: string;
}