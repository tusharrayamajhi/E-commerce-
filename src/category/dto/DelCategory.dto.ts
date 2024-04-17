/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class DelCategory{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ids:string
}