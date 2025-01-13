/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, ValidationPipe, UseGuards, ParseUUIDPipe, Patch, Delete } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/Roles.decorator';
import { CanAccess } from 'src/guard/CanAccess.guard';
import { roles } from 'src/roles/website.roles';
// import { vendorLogin } from './dto/login.vendor.dto';
import { SellerDto } from './dto/seller.dto';
import { SellerLoginDto } from './dto/sellerLogin.dto';

@Controller()
@ApiTags('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('requestForSeller')
  @ApiBody({type: SellerDto})
  async becomeASellor(
    @Body(new ValidationPipe()) sellerDto:SellerDto){
    try{
      return this.vendorService.becomeASellor(sellerDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("sellerRequest")
  @UseGuards(CanAccess)
  @Roles(roles.admin)
  @ApiBearerAuth("jwt")
  async getAllSellerRequest(){
    try{
      return await this.vendorService.getAllSellerRequest()
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Patch("verifiySeller/:id")
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.admin)
  async updateVendor(@Param('id', ParseUUIDPipe) id:string){
    try{
      return await this.vendorService.updateVendor(id)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('seller/login')
  async LoginSeller(@Body(new ValidationPipe({whitelist:true})) loginDto:SellerLoginDto){
    try{
      return await this.vendorService.LoginSeller(loginDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(":id")
  @Roles(roles.admin,roles.vendor)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async getVendorById(@Param('id', ParseUUIDPipe) id:string){
    try{
      return await this.vendorService.getVendorById(id);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // @Post('login')
  // @ApiBody({
  //   type: vendorLogin,
  // })
  // async vendorLogin(@Body(new ValidationPipe()) loginDto:vendorLogin){
  //   try{
  //     return await this.vendorService.vendorLogin(loginDto)
  //   }catch(err){
  //     throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }

  

  @Delete(':id')
  @Roles(roles.admin,roles.vendor)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async deleteVendor(@Param('id', ParseUUIDPipe) id:string){
    try{
      return await this.vendorService.deleteVendor(id);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
}
