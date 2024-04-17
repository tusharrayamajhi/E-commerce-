/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";


export class businessWebsiteInfoDto {
    @ApiProperty()
    @IsOptional()
    @IsUrl({}, { message: 'Invalid website link' })
    websiteLink: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    facebook: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    instagram: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    youtube: string;
}