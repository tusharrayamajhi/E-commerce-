/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SubCategory } from 'src/sub-category/entities/subcategory.enttities';
import { Seller } from 'src/vendor/entities/seller.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Seller,SubCategory])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
