/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WishList } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { postWishlistDto } from './dto/postWishlist.dto';

@Injectable()
export class WishlistService {
  
    constructor(
        @InjectRepository(WishList) private wishlistRepo:Repository<WishList>,
        @InjectRepository(User) private userRepo:Repository<User>,
        @InjectRepository(Product) private ProductRepo:Repository<Product>
        ){}
        
    async postWishList(req:any,wishlistProduct: postWishlistDto) {
        try{
            const result = await this.wishlistRepo.findOne({where:{user:Equal(req.user.id),product:Equal(wishlistProduct.productId)}})
            if(result){
                await this.wishlistRepo.remove(result)
                return {message:"sucessfully remove"}
            }
            const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)},relations:{wishlist:true}})
            if(!user){
                throw new HttpException("Invalid user id",HttpStatus.NOT_FOUND)
            }
            const product = await this.ProductRepo.findOne({where:{id:Equal(wishlistProduct.productId)}})
            if(!product){
                throw new HttpException("invalid product id",HttpStatus.NOT_FOUND)
            }
            const wishlist = this.wishlistRepo.create({user:user,product:product})
            if(!wishlist){
                throw new HttpException("cannot create wishlist",HttpStatus.FORBIDDEN)
            }
            await this.wishlistRepo.save(wishlist)
            return {message:"successfully created a wishlist"}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async getByUserId(req: any) {
    try{
        const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)},relations:{wishlist:true}})
        if(!user){
            throw new HttpException("invalid user id",HttpStatus.NOT_FOUND)
        }
        return{wishlist:user.wishlist}
    }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }


  }
}
