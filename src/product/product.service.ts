/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Equal, In, IsNull, Not, Repository } from 'typeorm';
import { SubCategory } from 'src/sub-category/entities/subcategory.enttities';
import { UpdateProductDto } from './dto/update-product.dto';
import { Seller } from 'src/vendor/entities/seller.entity';
import { roles } from 'src/roles/website.roles';

@Injectable()
export class ProductService {
  
  constructor(
    @InjectRepository(Product) private ProductRepo:Repository<Product>,
    @InjectRepository(Seller) private sellerRepo:Repository<Seller>,
    @InjectRepository(SubCategory) private subCategory:Repository<SubCategory>,
    ){}

    async deleteProduct(productid: string) {
      try{
        const products = await this.ProductRepo.find({where:{id:In([...JSON.parse(productid)])}})
        if(!products){
          throw new HttpException("invalid ids no data found",HttpStatus.NOT_FOUND)
        }
        for(const item of products){
          const result = await this.ProductRepo.softRemove(item)
          if(!result){
            throw new HttpException("unnable to delete product",HttpStatus.FORBIDDEN)
          }
        }
        return {message:"deleted sucessfully"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async getDelData(){
      try{
        const delData = await this.ProductRepo.find({where:{deletedAt:Not(IsNull())},withDeleted:true})
        if(!delData){
          throw new HttpException("No data found",HttpStatus.NOT_FOUND)
        }
        return {delData}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async restore(id:string){
      try{
        const product = await this.ProductRepo.find({where:{id:In([...JSON.parse(id)]),deletedAt:Not(IsNull())},withDeleted:true})
        if(!product){
          throw new HttpException("no data found",HttpStatus.NOT_FOUND)
        }
        for(const item of product){
          item.deletedAt = null;
          const result = await this.ProductRepo.save(item)
          if(!result){
            throw new HttpException("cannot save data",HttpStatus.FORBIDDEN)
          }
        }
        return {message:"restore sucessfully"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async delPermanently(id:string){
      try{
        const products = await this.ProductRepo.find({where:{id:In([...JSON.parse(id)]),deletedAt:Not(IsNull())},withDeleted:true})
        if(!products){
          throw new HttpException("no data found",HttpStatus.NOT_FOUND)
        }
        for(const item of products){
          const result = await this.ProductRepo.remove(item)
          if(!result){
            throw new HttpException("failed to delete item",HttpStatus.UNPROCESSABLE_ENTITY)
          }
        }
        return {message:"successfully delete item"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    
    async updateProductByid(user:any,images:Array<Express.Multer.File>,id: string,updateDto:UpdateProductDto) {
      try{
        console.log(user.id)
        const product = await this.ProductRepo.findOne({where:{id:Equal(id)},relations:{seller:true}})
        if(!product){
          throw new HttpException("invalid product id",HttpStatus.NOT_FOUND)
        }
        if(user.id != product.seller.id){
          throw new HttpException("you don't have access to edit this product",HttpStatus.FORBIDDEN)
        }
        let cateogry:any
      if(updateDto.categoryid){
        cateogry = await this.subCategory.findOne({where:{id:Equal(updateDto.categoryid)}})
      }
      let image:any
      if(images){
        image = images.map(img=>img.filename)
      }
      updateDto.images = image;
      updateDto.categoryid = cateogry;
      Object.assign(product,updateDto)
      const result =  await this.ProductRepo.save(product)
      if(!result){
        throw new HttpException("cannot update product",HttpStatus.FORBIDDEN)
      }
      return {message:"updated sucessfully"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

  async getProductById(id: string) {
    try{  
      const result = await this.ProductRepo.findOne({where:{id:Equal(id)},relations:{review:true,category:true}})
      if(!result){
        throw new HttpException("Invalid id",HttpStatus.NO_CONTENT)
      }
      return {result}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllProduct(user:any) {
    try{
      let result: string | any[];
      if(user.role == roles.anyone){
        result = await this.ProductRepo.find({relations:{category:true,review:true}});
      }else if(user.role == roles.vendor){
        const sellor = await this.sellerRepo.findOne({where:{id:Equal(user.id)},relations:{products:{review:true}}})
        result =sellor.products;
      }else if(user.role == roles.admin){
        result = await this.ProductRepo.find({relations:{seller:true,review:true,category:true}})
      }
      if(!result || result.length == 0){
        throw new HttpException("no data found",HttpStatus.NO_CONTENT)
      }
      return result;
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addProduct(images:Express.Multer.File[],createProductDto: CreateProductDto) {
    try{
      const vendor = await this.sellerRepo.findOne({where:{id:Equal(createProductDto.vendorId)}})
      if(!vendor){
        throw new HttpException("Invalid vendor id",HttpStatus.NOT_FOUND)
      }
      const cateogry = await this.subCategory.findOne({where:{id:Equal(createProductDto.categoryId)}})
      if(!cateogry){
        throw new HttpException("Invalid category id",HttpStatus.NOT_FOUND)
      }
      const imageName = images.map((img)=>img.filename);
      const newProduct = this.ProductRepo.create({...createProductDto,images:imageName,seller:vendor,category:cateogry})
      const result =  await this.ProductRepo.save(newProduct);
      if(!result){
        throw new HttpException("unable to add product to the database",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {Message:"sucessfully add product",result}
      
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
