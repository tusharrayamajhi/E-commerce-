/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, ValidationPipe, UseInterceptors, UploadedFiles, HttpException, HttpStatus, UseGuards, ParseUUIDPipe, Param, Patch, Req, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/multer.options';
import { CanAccess } from 'src/guard/CanAccess.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { roles } from 'src/roles/website.roles';
import { UpdateProductDto } from './dto/update-product.dto';
import { CanAccessProduct } from 'src/guard/CanAccessProduct.guard';
import { Request } from 'express';

@Controller('product')
@ApiTags('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type:CreateProductDto
  })
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.vendor)
  @UseInterceptors(FilesInterceptor('images',10,multerOptions))
  async addProduct(@UploadedFiles() images:Array<Express.Multer.File>,@Body(new ValidationPipe({whitelist:true})) createProductDto: CreateProductDto) {
    try{
      return await this.productService.addProduct(images,createProductDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  @Roles(roles.vendor,roles.anyone,roles.admin)
  @UseGuards(CanAccessProduct)
  @ApiBearerAuth("jwt")
  async getAllProduct(@Req() req:Request){
    try{
      return await this.productService.getAllProduct(req.user)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(":id")
  async getProductById(@Param('id', ParseUUIDPipe) id:string){
    try{
      return await this.productService.getProductById(id)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  @Patch(':id')
  @ApiBearerAuth("jwt")
  @ApiConsumes('multipart/form-data')
  @UseGuards(CanAccess)
  @Roles(roles.vendor)
  @UseInterceptors(FilesInterceptor('images',10,multerOptions))
  async updateProductById(@UploadedFiles() images:Array<Express.Multer.File>,@Req() req:Request,@Param('id', ParseUUIDPipe) id:string,@Body(new ValidationPipe({whitelist:true})) updateDto:UpdateProductDto){
    try{
      return await this.productService.updateProductByid(req.user,images,id,updateDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete('delete')
  @Roles(roles.vendor)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async deleteProduct(@Body(ValidationPipe) productid: string){
    try{
      return await this.productService.deleteProduct(productid);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('geDelData')
  @Roles(roles.vendor)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async getDelData(){
    try{
      return await this.productService.getDelData();
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("restore")
  @Roles(roles.vendor)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async restore(@Body(ValidationPipe) id:string){
    try{
      return await this.productService.restore(id)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete('delPermanently')
  @Roles(roles.vendor)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async delPermanently(@Body(ValidationPipe) id:string){
    try{
      return await this.productService.delPermanently(id)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
