/* eslint-disable prettier/prettier */
import { roles } from 'src/roles/website.roles';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SellerDto } from './dto/seller.dto';
import { PersonalInfo } from './entities/personalInfo.entity';

import { BusinessContactInfo } from './entities/contactInfo.entity';
import { BusinessInfo } from './entities/businessInfo.entity';
import { BussinessAddressInfo } from './entities/businessAddress.entity';
import { WebsiteInfo } from './entities/websiteInfo.entity';
import { Seller } from './entities/seller.entity';
import { SellerLogin } from './entities/Sellerlogin.entity';
import { SellerLoginDto } from './dto/sellerLogin.dto';
@Injectable()
export class VendorService {
  
  constructor(
    @InjectRepository(PersonalInfo) private personalRepo:Repository<PersonalInfo>,
    @InjectRepository(WebsiteInfo) private websiteRepo:Repository<WebsiteInfo>,
    @InjectRepository(BusinessContactInfo) private contactRepo:Repository<BusinessContactInfo>,
    @InjectRepository(BusinessInfo) private businessInfoRepo:Repository<BusinessInfo>,
    @InjectRepository(BussinessAddressInfo) private addressRepo:Repository<BussinessAddressInfo>,
    @InjectRepository(Seller) private sellerRepo:Repository<Seller>,
    @InjectRepository(SellerLogin) private sellerLoginRepo:Repository<SellerLogin>,
    @Inject(CACHE_MANAGER) private cachManager:Cache,
    private jwtService:JwtService,
    ){}
  
  async becomeASellor(selletDto:SellerDto) {
    try{
      const personal = await this.personalRepo.save(selletDto.personalInfo);
      if(!personal){
        throw new HttpException("cannot save personal info",HttpStatus.FORBIDDEN);
      }
      const contact = await this.contactRepo.save(selletDto.contactInfo);
      if(!contact){
        // await this.personalRepo.delete(personal.id)
        throw new HttpException("canno save contact info",HttpStatus.FORBIDDEN)
      }
      const bussiness = await this.businessInfoRepo.save(selletDto.businessInfo);
      if(!bussiness){
        // await this.personalRepo.delete(personal.id)
        // await this.contactRepo.delete(contact.id)
        throw new HttpException("cannot save business info",HttpStatus.FORBIDDEN)
      }
      const address = await this.addressRepo.save(selletDto.addressInfo);
      if(!address){
        // await this.personalRepo.delete(personal.id)
        // await this.contactRepo.delete(contact.id)
        // await this.businessInfoRepo.delete(bussiness.id)
        throw new HttpException("cannot save address info",HttpStatus.FORBIDDEN)
      }
      const websiteInfo = await this.websiteRepo.save(selletDto.websiteInfo); 
      if(!websiteInfo){
        // await this.personalRepo.delete(personal.id)
        // await this.contactRepo.delete(contact.id)
        // await this.businessInfoRepo.delete(bussiness.id)
        // await this.addressRepo.delete(address.id)
        throw new HttpException("cannot save website info",HttpStatus.FORBIDDEN)
      }
      const newpassword = await bcrypt.hash(selletDto.sellerLogin.password,10)
      selletDto.sellerLogin.password = newpassword;
      const sellerLogin = await this.sellerLoginRepo.save(selletDto.sellerLogin)
      if(!sellerLogin){
        throw new HttpException("cannot save login info",HttpStatus.FORBIDDEN)
      }
      const sellerDetails = this.sellerRepo.create({addressInfo:address,businessInfo:bussiness,contactInfo:contact,personalInfo:personal,websiteInfo:websiteInfo,login:sellerLogin})
      const result = await this.sellerRepo.save(sellerDetails)
      if(!result){
        throw new HttpException("cannot save seller details",HttpStatus.FORBIDDEN)
      }
      return {message:"will will contact you soon"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async LoginSeller(loginDto:SellerLoginDto){
    try{
      // const Login = await this.sellerLoginRepo.findOne({where:{email:loginDto.email}})
      const seller = await this.sellerRepo.findOne({where:{login:{email:loginDto.email}}})
      if(!seller){
        throw new HttpException("Invalid Email",HttpStatus.FORBIDDEN)
      }
      if(!await bcrypt.compare(loginDto.password,seller.login.password)){
        throw new HttpException("Invalid password",HttpStatus.FORBIDDEN)
      }
      const token = this.jwtService.sign({email:seller.login.email,id:seller.id,role:roles.vendor})
      await this.cachManager.set(`token:${token}`,token,86400000)
      return {token,seller}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async deleteVendor(id: string) {
    try{
      const vendor = await this.sellerRepo.findOne({where:{id:Equal(id)}})
      if(!vendor){
        throw new HttpException("Invalid id",HttpStatus.NO_CONTENT)
      }
      if(vendor.products.length > 0){
        throw new HttpException("vendor is linked with product so cannot delete vendor",HttpStatus.FORBIDDEN)
      }
      const result = await this.sellerRepo.softRemove(vendor)
      if(!result){
        throw new HttpException("cannot delete data",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {message:"sucessfully removed"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateVendor(id:string) {
    try{
      const vendor = await this.sellerRepo.findOne({where:{id:Equal(id)}})
      if(!vendor){
        throw new HttpException("Invalid Id",HttpStatus.NOT_FOUND)
      }
      vendor.isvendor = true;
      const result = await this.sellerRepo.save(vendor)
      if(!result){
        throw new HttpException("cannot update data",HttpStatus.FORBIDDEN)
      }
      return {message:"verified"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // async vendorLogin(loginDto: vendorLogin) {
  //   try{
  //     const vendor = await this.sellerRepo.findOne({where:{email:loginDto.email}})
  //     if(!vendor){
  //       throw new HttpException("Invalid email",HttpStatus.NO_CONTENT)
  //     }
  //     if(!await bcrypt.compare(loginDto.password,vendor.password)){
  //       throw new HttpException("Invalid password",HttpStatus.FORBIDDEN)
  //     }
  //     const token = this.jwtService.sign({email:vendor.email,id:vendor.id,role:roles.vendor})
  //     await this.cachManager.set(`token:${token}`,token,86400000);
  //     return {token}
  //   }catch(err){
  //     throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }

  async getVendorById(id: string) {
    try{
      const vendor = await this.sellerRepo.findOne({where:{id:Equal(id)},relations:{products:true}})
      if(!vendor){
        throw new HttpException("invalid id",HttpStatus.NO_CONTENT)
      }
      return {vendor}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllSellerRequest() {
    try{
      const vendor = await this.sellerRepo.find({where:{isvendor:false}})
      if(!vendor || vendor.length == 0){
        throw new HttpException("no data in database",HttpStatus.NOT_FOUND)
      }
      return {vendor}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
