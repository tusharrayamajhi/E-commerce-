/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/admin/entities/Admin.entities";
// import { Cart } from "src/cart/entities/cart.entities";
import { Category } from "src/category/entities/Category.entities";
import { Product } from "src/product/entities/product.entity";
import { Review } from "src/review/entities/review.entity";
import { SubCategory } from "src/sub-category/entities/subcategory.enttities";
import { SellerLogin } from "src/vendor/entities/Sellerlogin.entity";
import { BussinessAddressInfo } from "src/vendor/entities/businessAddress.entity";
import { BusinessInfo } from "src/vendor/entities/businessInfo.entity";
import { BusinessContactInfo } from "src/vendor/entities/contactInfo.entity";
import { PersonalInfo } from "src/vendor/entities/personalInfo.entity";
import { Seller } from "src/vendor/entities/seller.entity";
import { WebsiteInfo } from "src/vendor/entities/websiteInfo.entity";
import { WishList } from "src/wishlist/entities/wishlist.entity";

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory: (configservice:ConfigService)=>({
          type: "mysql",
          host: configservice.get<string>("DATABASE_HOST"),
          port: +configservice.get<string>("DATABASE_PORT"),
          username: configservice.get<string>("DATABASE_USERNAME"),
          password: configservice.get<string>("DATABASE_PASSWORD"),
          database: configservice.get<string>("DATABASE_NAME"),
          entities: [Product,SellerLogin,Admin,Category,SubCategory,BussinessAddressInfo,BusinessInfo,BusinessContactInfo,WebsiteInfo,PersonalInfo,Seller,Review,WishList],
          synchronize: true,
          autoLoadEntities: true,
          logging: false,
        })
      }),


      // TypeOrmModule.forRoot({
      //   type: 'postgres',
      //   url: 'postgresql://ecommerse_xnyz_user:SeWwMIZeWrvhiQyXuxB9Hb9OCuujQlbb@dpg-cu2bp0aj1k6c73ciakfg-a.singapore-postgres.render.com/ecommerse_xnyz',
      //   // url:`postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
      //   entities:[Product,SellerLogin,Admin,Category,SubCategory,BussinessAddressInfo,BusinessInfo,BusinessContactInfo,WebsiteInfo,PersonalInfo,Seller,Review,WishList],
      //   ssl:true,
      //   autoLoadEntities: true,
      //   synchronize: true, // Set to false in production
      // }),

      // TypeOrmModule.forRootAsync({
      //   useFactory:(configservice:ConfigService)=>({
      //     type:'postgres',
      //     url:configservice.get<string>("DBURL"),
      //     entities:[Product,SellerLogin,Admin,Category,SubCategory,BussinessAddressInfo,BusinessInfo,BusinessContactInfo,WebsiteInfo,PersonalInfo,Seller,Review,WishList],
      //     ssl:true,
      //     autoLoadEntities: true,
      //     synchronize: true, 
      //   }),
      //   inject:[ConfigService]
      // })


    ],
  })
export class DataBaseConnection{}