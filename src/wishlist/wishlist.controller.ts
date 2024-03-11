/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Roles } from 'src/decorator/Roles.decorator';
import { roles } from 'src/roles/website.roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CanAccess } from 'src/guard/CanAccess.guard';
import { postWishlistDto } from './dto/postWishlist.dto';

@Controller('wishlist')
@ApiTags("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('getByUserId')
  @Roles(roles.user)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  async getByUserId(@Req() req:Request){
    try{
      return await this.wishlistService.getByUserId(req)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post()
  @Roles(roles.user)
  @UseGuards(CanAccess)
  @ApiBearerAuth("jwt")
  async postWishList(@Req() req:Request,@Body(new ValidationPipe()) wishlistProduct:postWishlistDto){
    try{
      return await this.wishlistService.postWishList(req,wishlistProduct)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
