/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Equal, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
// import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepo:Repository<Review>,
    @InjectRepository(User) private userRepo:Repository<User>,
    @InjectRepository(Product) private productRepo:Repository<Product>
  ){}
  
  async deleteReview(req: any, id: string) {
    try{
      const reviewData = await this.reviewRepo.findOne({where:{id:Equal(id)},relations:{user:true}});
      if(!reviewData || reviewData.user.id != req.user.id ){
        throw new HttpException("invalid user or reivew id",HttpStatus.NOT_FOUND)
      }
      const result = await this.reviewRepo.remove(reviewData);
      if(!result){
        throw new HttpException("cannot delete reiview",HttpStatus.FORBIDDEN)
      }
      return {message:"successfully remove review"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getReviewByProduct(productId:string) {
    try{
      const product = await this.productRepo.findOne({where:{id:Equal(productId)},relations:{review:true}});
      if(!product){
        throw new HttpException("no product found",HttpStatus.NOT_FOUND)
      }
      const review = product.review;
      return{review}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  } 

  async addReview(req:any,createReviewDto: CreateReviewDto) {
    try{
      const userData = await this.userRepo.findOne({where:{id:req.user.id}})
      if(!userData){
        throw new HttpException("cannot find user",HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const productData = await this.productRepo.findOne({where:{id:createReviewDto.productId}});
      if(!productData){
        throw new HttpException("Invalid Product id",HttpStatus.NOT_FOUND)
      }
      const newReview = this.reviewRepo.create({product:productData,user:userData,rating:createReviewDto.rating,comment:createReviewDto.comment});
      const result = await this.reviewRepo.save(newReview);
      if(!result){
        throw new HttpException("cannot save data",HttpStatus.INTERNAL_SERVER_ERROR);
      } 
      
      return {result}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
