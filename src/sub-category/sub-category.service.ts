/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { SubCategory } from 'src/sub-category/entities/subcategory.enttities';
import { UpdateSubCategoryDto } from './dto/updateSubCategory.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubCategoryDto } from './dto/subCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, IsNull, Not, Repository } from 'typeorm';
import { Category } from 'src/category/entities/Category.entities';
import { DelDto } from './dto/DelSubCategory.dto';

@Injectable()
export class SubCategoryService {
    
    constructor(
        @InjectRepository(Category) private categoryRepo :Repository<Category>,
        @InjectRepository(SubCategory) private SubCategoryRepo : Repository<SubCategory>
        ){}
        
        async getDelData() {
            try{
                const result = await this.SubCategoryRepo.find({where:{deletedAt:Not(IsNull())},withDeleted:true})
                if(!result){
                    throw new HttpException("no data in database",HttpStatus.NOT_FOUND)
                }
                return {result}
            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }


        async restoreData(ids: DelDto) {
            try{
                console.log(JSON.parse(ids.ids))
                const data = await this.SubCategoryRepo.find({where:{id:In([...JSON.parse(ids.ids)]),deletedAt:Not(IsNull())},withDeleted:true})
                console.log(data)
                if(!data || data.length == 0){
                    throw new HttpException("Invalid SubCategory ids",HttpStatus.NOT_FOUND)
                }
                for(const Category of data){
                    Category.deletedAt = null
                    console.log(Category)
                    await this.SubCategoryRepo.save(Category)
                }
                return {message:"successfully restore data"}

            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        
        async deleteSubCategory(ids: DelDto) {
            try{
                const subcategory = await this.SubCategoryRepo.find({where:{id:In([...JSON.parse(ids.ids)])},relations:{product:true}})
                if(!subcategory || subcategory.length == 0){
                    throw new HttpException("no datat in database",HttpStatus.NO_CONTENT)
                }
                for(const Cat of subcategory){
                    if(Cat.product.length>0){
                        throw new HttpException("cannot delete this category because it have link with product",HttpStatus.INTERNAL_SERVER_ERROR)
                    }
                    await this.SubCategoryRepo.softRemove(Cat);

                }
                return {message:"deleted sucess"}
            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        async updateSubCategoryById(id: string, updateDto: UpdateSubCategoryDto) {
            try{
                const subCategory = await this.SubCategoryRepo.findOne({where:{id:Equal(id)}})
                if(!subCategory){
                    throw new HttpException("no data in database",HttpStatus.NO_CONTENT)
                }
                // const newcat =  this.SubCategoryRepo.create({...SubCategory,name:updateDto.name})
                Object.assign(subCategory,updateDto)
                // console.log(newcat)
                const result = await this.SubCategoryRepo.save(subCategory)
                console.log(result)
                if(!result){
                    throw new HttpException("cannot save data",HttpStatus.FORBIDDEN)
                }
                return {message:"update sucessfully"}
            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        async getSubCategoryByCategoryId(id: string) {
            try{
                const category = await this.SubCategoryRepo.findOne({where:{id:Equal(id)},relations:{category:true,product:true}})
                if(!category ){
                    throw new HttpException("no data in database",HttpStatus.NO_CONTENT)
                }
                return {category}
            }catch(err){
                throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

    async getAllSubCategory() {
        try{
            const subCategory = await this.SubCategoryRepo.find({relations:{category:true}})
            if(!subCategory || subCategory.length == 0){
                throw new HttpException("no data in database",HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return subCategory;
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
    
    async addSubCategory(subCategoryDto: SubCategoryDto) {
    try{
        const category = await this.categoryRepo.findOne({where:{id:Equal(subCategoryDto.categoryId)}})
        if(!category){
            throw new HttpException("no category found",HttpStatus.NOT_FOUND)
        }
        const newSubCateogory = this.SubCategoryRepo.create({ ...subCategoryDto, category: category })
        const result = await this.SubCategoryRepo.save(newSubCateogory)
        if(!result){
            throw new HttpException("cannot save data in database",HttpStatus.FORBIDDEN)
        }
        return {message:"save subCateogry sucessfully"}
        
    }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }



}
