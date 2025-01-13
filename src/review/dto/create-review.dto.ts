/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, Max, Min } from "class-validator"

export class CreateReviewDto {
   
    @ApiProperty()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating:number

    @ApiProperty()
    @IsNotEmpty()
    comment:string

    @ApiProperty()
    @IsNotEmpty()
    productId:string

}
