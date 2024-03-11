/* eslint-disable prettier/prettier */
import { Controller,Post, Body, Delete, HttpException, HttpStatus, ValidationPipe, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyOTPDto } from './dto/VerifyOTP.dto';
import { UserLoginDto } from './dto/UserLogin.dto';
import { Roles } from 'src/decorator/Roles.decorator';
import { roles } from 'src/roles/website.roles';
import { Request } from 'express';
import { ChangePasswordDto } from './dto/changepassword.dto';
import { ForgotpasswordDto } from './dto/forgotpassword.dto';
import { ForgotpasswordChangeDto } from './dto/forgortpasswordchange.dto';

@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post("signup")
  async userSignup(@Body(new ValidationPipe({whitelist:true})) userSignupDto:CreateUserDto){
    try{
      return await this.userService.userSignup(userSignupDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("verifyOTP")
  async verifyOTP(@Body(new ValidationPipe({whitelist:true})) verifyOTPDto:VerifyOTPDto){
    try{
      return await this.userService.verifyOTP(verifyOTPDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("login")
  async UserLogin(@Body(new ValidationPipe({whitelist:true})) loginDto:UserLoginDto){
    try{
      return await this.userService.UserLogin(loginDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  @Roles(roles.user)
  async getUserById(@Req() req:Request){
    try{
      return await this.userService.getUserById(req);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  @Post("changePassword")
  async changePassword(@Body(new ValidationPipe({whitelist: true})) changePasswordDto:ChangePasswordDto){
    try{
      return await this.userService.changePassword(changePasswordDto)
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("forgotPassword")
  async forgotPassword(@Body(new ValidationPipe({whitelist:true})) forgotpasswordDto:ForgotpasswordDto){
    try{
      return await this.userService.forgotPassword(forgotpasswordDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post("forgotPasswordChange")
  async forgotPasswordChange(@Body(new ValidationPipe({whitelist:true})) forgotpasswordChangeDto:ForgotpasswordChangeDto){
    try{ 
      return await this.userService.forgotPasswordChange(forgotpasswordChangeDto);
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete("del")
  async delete(){
    return await this.userService.delete()
  }

}
