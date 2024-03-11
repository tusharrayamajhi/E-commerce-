/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class BusinessInfoDto{
    @ApiProperty()
    @IsNotEmpty()
    businessName: string;
  
    @IsNotEmpty()
    @ApiProperty()
    registrationNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    businessType: string;

    @ApiProperty()
    @IsString()
    dateEstablished: Date;
}