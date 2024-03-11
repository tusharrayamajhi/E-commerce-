/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import {  ApiTags } from '@nestjs/swagger';
import { AdminDto } from './dto/Admin.dto';
import {changePassword} from './dto/ChangeAdminPassword.dto'

@Controller('admin')
@ApiTags("Admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("signup")
  async signUpAdmin(@Body(new ValidationPipe({whitelist:true})) adminDto: AdminDto){
    try{
      console.log(adminDto)
      return this.adminService.signUpAdmin(adminDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

 @Patch("changepassword")
 async changeAdminPassword(@Body(new ValidationPipe({whitelist:true})) adminDto:changePassword ){
  try{
    return await this.adminService.changePassword(adminDto)
  }catch(err){
    throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
  }
 }

  @Post("login")
  async AdminLogin(@Body(new ValidationPipe({whitelist:true})) loginInfo:AdminDto){
  try{
    return await this.adminService.AdminLogin(loginInfo);
  }catch(err){
    throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
  }
 }

}
