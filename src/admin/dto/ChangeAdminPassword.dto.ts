/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class changePassword {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}