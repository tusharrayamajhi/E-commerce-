/* eslint-disable prettier/prettier */


import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString,IsOptional, IsUUID} from 'class-validator';

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    vendorId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    categoryId:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    stock:number

    @ApiProperty()
    @IsString()
    @IsOptional()
    discount:number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    @Transform(({ value }) => value.map(file => file.buffer))
    images: Express.Multer.File[];
}
