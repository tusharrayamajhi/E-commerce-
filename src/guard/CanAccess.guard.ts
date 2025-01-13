/* eslint-disable prettier/prettier */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class CanAccess implements CanActivate{
    constructor(private reflector :Reflector,private jwtService:JwtService,@Inject(CACHE_MANAGER) private cacheManager:Cache){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const roles  = this.reflector.get<string[]>('roles',context.getHandler())
        const req = context.switchToHttp().getRequest()
        const token = req.headers.authorization;
        // console.log(token)
        if(!token){
            return false;
        }
        const newToken = token.split(" ")[1]
        // console.log(newToken)
        const decode = await this.jwtService.decode(await this.cacheManager.get(`token:${newToken}`));
        console.log(decode)
        if(!decode){
            return false;
        }
        if(roles.includes(decode.role)){
            req.user = decode;
            return true
        }else{
            return false
        }
        
    }
    
}