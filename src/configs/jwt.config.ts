/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({
        secret:process.env.JWTSECRET,
        global:true,
        signOptions:{
            expiresIn:"1d"
        }
    })]
})
export class jwtConfig{

}