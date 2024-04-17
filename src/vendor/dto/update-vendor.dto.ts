/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateVendorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

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
