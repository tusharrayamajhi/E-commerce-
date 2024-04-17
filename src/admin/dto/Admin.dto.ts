/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AdminDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}