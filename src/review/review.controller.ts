/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpException, HttpStatus, ValidationPipe, UseGuards, Req, Get, ParseUUIDPipe, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
// import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CanAccess } from '../guard/CanAccess.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { roles } from 'src/roles/website.roles';
import { Request } from 'express';

@Controller('review')
@ApiTags("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(CanAccess)
  @Roles(roles.user)
  @ApiBearerAuth("jwt")
  async addReview(@Req() req:Request,@Body(new ValidationPipe({whitelist: true}),) createReviewDto:CreateReviewDto ){
    try{
      return await this.reviewService.addReview(req,createReviewDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  @UseGuards(CanAccess)
  @Roles(roles.user)
  @ApiBearerAuth("jwt")
  async deleteReview(@Req() req:Request,@Param('id', ParseUUIDPipe) id:string ){
    try{
      return await this.reviewService.deleteReview(req,id);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:productId')
  async getReviewByProduct(@Param('productId', ParseUUIDPipe) productId:string){
    try{
      return await this.reviewService.getReviewByProduct(productId);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  
}
