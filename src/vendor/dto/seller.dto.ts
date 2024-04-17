/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger"
import { PersonalInfoDto } from "./personalInfo.dto"
import { BusinessInfoDto } from "./businessInfo.dto"
import { BusinessAddressInfoDto } from "./businessAddress.dto"
import { businessWebsiteInfoDto } from "./websiteInfo.dto"
import { IsNotEmpty, IsObject, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { BusinessContactInfoDto } from "./contactInfo.dto"
import { SellerLoginDto } from "./sellerLogin.dto"


export class SellerDto{

    @ValidateNested()
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>PersonalInfoDto)
    personalInfo: PersonalInfoDto

    @ValidateNested()
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>BusinessContactInfoDto)
    contactInfo: BusinessContactInfoDto

    @ValidateNested()
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>businessWebsiteInfoDto)
    businessInfo: BusinessInfoDto

    @ValidateNested()
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>BusinessAddressInfoDto)
    addressInfo: BusinessAddressInfoDto 

    @ValidateNested()
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>businessWebsiteInfoDto)
    websiteInfo: businessWebsiteInfoDto

    @ValidateNested()
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    @Type(()=>SellerLoginDto)
    sellerLogin:SellerLoginDto
}