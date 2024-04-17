/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateProductDto {

    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    price: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    stock: number;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    discount: string;
  
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    @Transform(({ value }) => value.map(file => file.buffer))
    images: Express.Multer.File[];
  
    @ApiProperty()
    @IsUUID()
    categoryid: string;
}
