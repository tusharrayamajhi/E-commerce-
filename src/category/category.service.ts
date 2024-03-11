/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category.entities';
import { In, IsNull, Not, Repository,Equal } from 'typeorm';
import { DelCategory } from './dto/DelCategory.dto';

@Injectable()
export class CategoryService {
    
    constructor(@InjectRepository(Category) private categoryRepo:Repository<Category>){}
    
    async getCategoryById(id: string) {
        try{
            const category = await this.categoryRepo.findOne({where:{id:Equal(id)},relations:{subCategory:{product:true}}})
            if(!category){
                throw new HttpException("Invalid Id",HttpStatus.NOT_FOUND)
            }
            return {category}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async restoreData(id: DelCategory) {
        try{
            const category = await this.categoryRepo.find({where:{id:In([...JSON.parse(id.ids)]),deletedAt:Not(IsNull())},withDeleted:true})
            if(!category){
                throw new HttpException("Invalid category id",HttpStatus.NOT_FOUND)
            }
            for(const data of category){
                data.deletedAt = null;
                await this.categoryRepo.save(data);
            }
            return {message:"restore sucess"}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async updateCategoryById(id: string,updateDto:CategoryDto) {
        try{
            const cateogry = await this.categoryRepo.findOne({where:{id:Equal(id)}})
            if(!cateogry){
                throw new HttpException("cannot found category",HttpStatus.NO_CONTENT)
            }
            Object.assign(cateogry,updateDto)
            console.log(cateogry)
            const result = await this.categoryRepo.save(cateogry)
            if(!result){
                throw new HttpException("cannnot save data",HttpStatus.FORBIDDEN)
            }
            return {message:"update sucessfully"}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async DelPermanent(ids: DelCategory) {
        try{
            const result = await this.categoryRepo.find({where:{id:In([...JSON.parse(ids.ids)]),deletedAt:Not(IsNull())},withDeleted:true})
            if(result.length != [...JSON.parse(ids.ids)].length ){
                throw new HttpException("some id are invalid",HttpStatus.NOT_FOUND)
            }
            if(!result || result.length == 0){
                throw new Error("no data in database")
            }
            result.forEach(async data => {
                await this.categoryRepo.remove(data);
            });
            return {message:"remove permanently"}
        }catch(err){
            throw new Error(err)
        }
    }

    async getDelCategory() {
        try{
            const result = await this.categoryRepo.find({where:{deletedAt:Not(IsNull())},withDeleted:true})
            console.log(result)
            if(result.length == 0 || !result){
                throw new HttpException("no data in database",HttpStatus.NO_CONTENT)
            }
            return {result}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    async SoftDeleteCategory(ids: string) {
        try{
            const result  = await this.categoryRepo.find({where:{id:In([...JSON.parse(ids)])},relations:{subCategory:true}})
            if(result.length != [...JSON.parse(ids)].length){
                throw new HttpException("some id are invalid",HttpStatus.NOT_FOUND)
            }
            if(!result || result.length == 0){
                throw new HttpException("no content in database",HttpStatus.NO_CONTENT)
            }
            for(const data of result){
                if(data.subCategory.length > 0){
                    throw new HttpException(`${data.name} cannot delete category because it have sub category`,HttpStatus.FORBIDDEN)
                }
                await this.categoryRepo.softRemove(data);
            }

            return {message:"remove sucessfully"}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllCategory() {
        try{
            const result = await this.categoryRepo.find({relations:{subCategory:true}})
            if(!result || result.length == 0){
                throw new HttpException("Empty data",HttpStatus.NO_CONTENT)
            }
            return {result}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async addCategory(categoryDto:CategoryDto) {
    try{
        const result = await this.categoryRepo.save(categoryDto);
        if(!result){
            throw new HttpException("cannot save data",HttpStatus.FORBIDDEN)
        }
        return {message:"category save sucessfully"}
    }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
}
