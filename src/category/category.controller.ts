/* eslint-disable prettier/prettier */
import { Param, ParseUUIDPipe } from '@nestjs/common';
import { HttpException, HttpStatus, Body, Controller, Delete, Get, Post, UseGuards, ValidationPipe, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { DelCategory } from './dto/DelCategory.dto';
import { Roles } from 'src/decorator/Roles.decorator';
import { roles } from 'src/roles/website.roles';
import { CanAccess } from 'src/guard/CanAccess.guard';

@Controller('category')
@ApiTags("Category")
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @Roles(roles.admin)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async addCategory(@Body(new ValidationPipe({whitelist:true})) categoryDto: CategoryDto) {
    try {
      return await this.categoryService.addCategory(categoryDto);
    } catch (err) {
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("getCategory")
  async getAllCategory() {
    try {
      return await this.categoryService.getAllCategory();
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete()
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  @Roles(roles.admin)
  async DeleteCateogry(@Body(ValidationPipe) ids: string) {
    try {
      return await this.categoryService.SoftDeleteCategory(ids)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get("getDelData")
  @Roles(roles.admin)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async getDelCategory() {
    try {
      return await this.categoryService.getDelCategory()
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete("permanent")
  @Roles(roles.admin)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async DelPermanent(@Body(new ValidationPipe({whitelist:true})) ids: DelCategory) {
    try {
      return await this.categoryService.DelPermanent(ids)
    } catch (err) {
      throw new Error(err)
    }
  }

  @Post("restore")
  @Roles(roles.admin)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async restoreData(@Body(new ValidationPipe({whitelist:true})) id: DelCategory) {
    try {
      return await this.categoryService.restoreData(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get(':id')
  @Roles(roles.admin)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async getCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.categoryService.getCategoryById(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Patch(":id")
  @Roles(roles.admin)
  @ApiBearerAuth("jwt")
  @UseGuards(CanAccess)
  async updateCategoryById(@Param("id", ParseUUIDPipe) id: string, @Body(new ValidationPipe()) updateDto: CategoryDto) {
    try {
      return await this.categoryService.updateCategoryById(id, updateDto)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
