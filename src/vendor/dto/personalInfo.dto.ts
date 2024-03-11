/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class PersonalInfoDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string
  
    @ApiProperty()
    @IsString()
    @IsOptional()
    middleName: string
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender: string
  }