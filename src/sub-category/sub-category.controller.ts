/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubCategoryDto } from './dto/subCategory.dto';
import { DelDto } from './dto/DelSubCategory.dto';
import { UpdateSubCategoryDto } from './dto/updateSubCategory.dto';
import { CanAccess } from 'src/guard/CanAccess.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { roles } from 'src/roles/website.roles';

@Controller('sub-category')
@ApiTags("subcategory")
@ApiBearerAuth("jwt")
@UseGuards(CanAccess)
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}
  
  @Get("delData")
  @Roles(roles.admin)
  async getDelData(){
    try{
      return await this.subCategoryService.getDelData()
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post()
  @Roles(roles.admin)
  async addSubCategory(@Body(new ValidationPipe({whitelist:true})) subCategoryDto:SubCategoryDto){
    try{
      return await this.subCategoryService.addSubCategory(subCategoryDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  @Roles(roles.admin)
  async getAllSubCategory(){
    try{
      return await this.subCategoryService.getAllSubCategory();
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("restore")
  @Roles(roles.admin)
  async restoreData(@Body(new ValidationPipe({whitelist:true})) ids:DelDto){
    try{
     return await this.subCategoryService.restoreData(ids);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(":id")
  @Roles(roles.admin)
  async getSubCategoryByCategoryId(@Param("id", ParseUUIDPipe) id: string){
    try{
      return await this.subCategoryService.getSubCategoryByCategoryId(id);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Patch(":id")
  @Roles(roles.admin)
  async updateSubCategoryById(@Param("id",ParseUUIDPipe) id:string,@Body(new ValidationPipe({whitelist:true})) updateDto:UpdateSubCategoryDto){
    try{
      return await this.subCategoryService.updateSubCategoryById(id,updateDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete()
  @Roles(roles.admin)
  async softRemove(@Body(new ValidationPipe({whitelist:true})) ids:DelDto){
    try{
      return await this.subCategoryService.deleteSubCategory(ids);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
