/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { VendorModule } from './vendor/vendor.module';
import { ConfigModule } from '@nestjs/config';
import { DataBaseConnection } from './configs/DataBase.config';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    DataBaseConnection,
    BullModule.forRoot({
      redis:{
        host:"127.0.0.1",
        port:6379
      }
    }),
    MailerModule.forRoot({
      transport:{
        host:"smtp.gmail.com",
        auth:{
          user:"tusharrayamajhi6@gmail.com",
          pass:"mfto jhyi rpmq cmtz"
        }
      }
    }),
    ProductModule,
    VendorModule,
    ConfigModule.forRoot({isGlobal:true}),
    
    CategoryModule, 
    AdminModule,
    JwtModule.register({
    secret:process.env.JWTSECRET,
    global:true,
    signOptions:{
        expiresIn:"1d"
    }
    }), 
    CacheModule.register({isGlobal:true}),
    SubCategoryModule,
    ReviewModule,
    UserModule,
    WishlistModule,
    ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
