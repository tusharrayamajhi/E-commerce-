/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from './entities/wishlist.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WishList,User,Product])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
