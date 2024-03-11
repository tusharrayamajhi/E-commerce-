/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";


export class postWishlistDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    productId:string
}