/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from './entities/subcategory.enttities';
import { Category } from 'src/category/entities/Category.entities';

@Module({
  imports:[TypeOrmModule.forFeature([SubCategory,Category])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
