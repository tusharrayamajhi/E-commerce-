/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class SubCategoryDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    categoryId:string
}