/* eslint-disable prettier/prettier */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { VerifyOTPDto } from './dto/VerifyOTP.dto';
import { UserLoginDto } from './dto/UserLogin.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { roles } from 'src/roles/website.roles';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ChangePasswordDto } from './dto/changepassword.dto';
import { ForgotpasswordDto } from './dto/forgotpassword.dto';
import { ForgotpasswordChangeDto } from './dto/forgortpasswordchange.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private userRepo:Repository<User>,
    private readonly jwtService:JwtService,
    @Inject(CACHE_MANAGER) private cacheManager:Cache,
    @InjectQueue("send_OTP") private OTPemail:Queue
    ){}
    
    async forgotPasswordChange(forgotpasswordChangeDto: ForgotpasswordChangeDto) {
      try{
        const user = await this.userRepo.findOne({where:{email:Equal(forgotpasswordChangeDto.email)}})
        if(!user){
          throw new HttpException("Invalid user email",HttpStatus.NOT_FOUND)
        }
        if(await this.cacheManager.get(`OTP:${forgotpasswordChangeDto.email}`) != forgotpasswordChangeDto.OTP){
          throw new HttpException("wrong OTP",HttpStatus.NOT_FOUND)
        }
        user.password = await bcrypt.hash(forgotpasswordChangeDto.newPassword,10);
        const result = await this.userRepo.save(user);
        if(!result){
          throw new HttpException("cannot save user",HttpStatus.FORBIDDEN)
        }
        return {message:"passsword change successfully"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async forgotPassword(forgotpasswordDto: ForgotpasswordDto) {
      try{
        const user = await this.userRepo.findOne({where:{email:Equal(forgotpasswordDto.email)}})
        if(!user){
          throw new HttpException("Invalid email",HttpStatus.NOT_FOUND)
        }
        const otp =Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        await this.OTPemail.add("OTP-mail",{
          email:forgotpasswordDto.email,
          OTP:otp
        })
        this.cacheManager.set(`OTP:${forgotpasswordDto.email}`,otp,320000);
        return {message:"check email for OPT"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }



    async changePassword(changePasswordDto: ChangePasswordDto) {
      try{
        const user = await this.userRepo.findOne({where:{email:Equal(changePasswordDto.email)}})
        if(!user){
          throw new HttpException("invalid email",HttpStatus.NOT_FOUND)
        }
        if(!await bcrypt.compare(changePasswordDto.password , user.password)){
          throw new HttpException("incorrect password",HttpStatus.NOT_FOUND)
        }
        user.password = await bcrypt.hash(changePasswordDto.newPassword,10);
        const result = await this.userRepo.save(user);
        if(!result){
          throw new HttpException("cannot save user",HttpStatus.FORBIDDEN)
        }
        return {message:"successfully change passoword"}
      }catch(err){
        throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }


  async getUserById(req: any) {
    try{
      const user = await this.userRepo.findOne({where:{id:Equal(req.user.id)}})
      if(!user){
        throw new HttpException("invalid user",HttpStatus.NOT_FOUND)
      }
      return {user}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async UserLogin(loginDto:UserLoginDto) {
    try{
      const user = await this.userRepo.findOne({where:{email:Equal(loginDto.email)}})
      if(!user){
        throw new HttpException("Invalid email",HttpStatus.NOT_FOUND)
      }
      if(!await bcrypt.compare(loginDto.password,user.password)){
        throw new HttpException("Invalid password",HttpStatus.NOT_FOUND)
      }
      if(!user.isVerify){
        throw new HttpException("user is not verified",HttpStatus.NOT_FOUND)
      }
      const token = this.jwtService.sign({email:user.email,id:user.id,role:roles.user})
      if(!token){
        throw new HttpException("cannot generate token",HttpStatus.NOT_FOUND)
      }
      return {token}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete() {
    await this.userRepo.delete({})
  }

  async verifyOTP(verifyOTPDto: VerifyOTPDto) {
    try{
      const user = await this.userRepo.findOne({where:{email:Equal(verifyOTPDto.email)}})
      if(!user){
        throw new HttpException("wrong email id",HttpStatus.NOT_FOUND)
      }
      if(await this.cacheManager.get(`OTP:${verifyOTPDto.email}`) != verifyOTPDto.OTP){
        throw new HttpException("wrong OTP",HttpStatus.NOT_FOUND)
      }
      user.isVerify = true;
      const updateUser = await this.userRepo.save(user);
      if(!updateUser){
        throw new HttpException("cannot update user",HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {message:"verify sucessfully"}
    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async userSignup(userSignupDto: CreateUserDto) {
    try{
      const password = await bcrypt.hash(userSignupDto.password,10)
      const newuser = this.userRepo.create({...userSignupDto,password:password})
      const result = await this.userRepo.save(newuser)
      if(!result){
        throw new HttpException("cannot save user",HttpStatus.FORBIDDEN)
      }
      const otp =Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      const redis_result = await this.OTPemail.add("OTP-mail",{
        email:userSignupDto.email,
        OTP:otp
      })
      this.cacheManager.set(`OTP:${userSignupDto.email}`,otp,120000);
      return {message:"register sucessfully",email:userSignupDto.email,redis_result}

    }catch(err){
      throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  

}
