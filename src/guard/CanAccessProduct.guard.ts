/* eslint-disable prettier/prettier */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { roles } from 'src/roles/website.roles';

@Injectable()
export class CanAccessProduct implements CanActivate{
    constructor(private reflector :Reflector,private jwtService:JwtService,@Inject(CACHE_MANAGER) private cacheManager:Cache){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const role  = this.reflector.get<string[]>('roles',context.getHandler())
        const req = context.switchToHttp().getRequest()
        const token = req.headers.authorization;
        if(!token){
            req.user = {role:roles.anyone};
            return true;
        }
        const newToken = token.split(" ")[1]
        const decode = await this.jwtService.decode(await this.cacheManager.get(`token:${newToken}`));
        console.log(decode)
        if(!decode){
            return false;
        }
        if(role.includes(decode.role)){
            req.user = decode;
            return true
        }else{
            return false
        }
        
    }
    
}