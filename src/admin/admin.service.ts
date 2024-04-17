/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/Admin.entities';
import { Repository } from 'typeorm';
import { AdminDto } from './dto/Admin.dto';
import * as bcrypt from 'bcrypt';
import { changePassword } from './dto/ChangeAdminPassword.dto';
import { JwtService } from '@nestjs/jwt';
import { roles } from 'src/roles/website.roles';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AdminService {

    constructor(@InjectRepository(Admin) private adminRepo:Repository<Admin>,private readonly jwtService:JwtService,@Inject(CACHE_MANAGER) private cacheManager:Cache){}

    async signUpAdmin(adminDto: AdminDto){
        try{
            const password = await bcrypt.hash(adminDto.password,10);
            const newAdmin = this.adminRepo.create({username:adminDto.username,password:password})
            const result = await this.adminRepo.save(newAdmin);
            if(!result){
                throw new HttpException("cannot save data",HttpStatus.FORBIDDEN)
            }
            return {message:"save sucessfully"}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }

      async AdminLogin(loginInfo:AdminDto){
        try{
            const result = await this.adminRepo.findOne({where:{username:loginInfo.username}})
            if(!result){
                throw new HttpException("username is incorrect",HttpStatus.FORBIDDEN)
            }
            if(!await bcrypt.compare(loginInfo.password,result.password)){
                throw new HttpException("password is incorrect",HttpStatus.NOT_FOUND)
            }
            const token = this.jwtService.sign({username:result.username,id:result.id,role:roles.admin})
            await this.cacheManager.set(`token:${token}`,token,86400000);
            return {token}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }

      async changePassword(adminDto:changePassword){
        try{
            const admin = await this.adminRepo.findOne({where:{username:adminDto.username}})
            if(!admin){
                throw new InternalServerErrorException('Admin not found');
            }
            const passwordMatch = await bcrypt.compare(adminDto.oldPassword, admin.password);

            if (!passwordMatch) {
                throw new InternalServerErrorException('Old password is incorrect');
            }
            admin.password = await bcrypt.hash(adminDto.newPassword,10);
            const result = await this.adminRepo.save(admin);
            if(!result){
                throw new HttpException("cannot save data",HttpStatus.BAD_REQUEST)
            }
            return {message:"change succesfully"}
        }catch(err){
            throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
