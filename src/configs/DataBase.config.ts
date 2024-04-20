/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Admin } from "src/admin/entities/Admin.entities";
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
      // TypeOrmModule.forRoot({
      //     type: "postgres",
      //     url:`${process.env.DBURL}`,

      //     // host: process.env.DATABASE_HOST,
      //     // port: configService.get<number>('DATABASE_PORT'),
      //     // username: process.env.DATABASE_USERNAME,
      //     // password: process.env.DATABASE_PASSWORD,
      //     // database: process.env.DATABASE_NAME,

      //     // port: 5432,
      //     // host: "dpg-cohlas5jm4es739as3hg-a",
      //     // username: "e_commerce_m6s1_user",
      //     // password: "HFkAAkgCoooceXHYOXF7GAgv6ps9zD2X",
      //     // database: "e_commerce_m6s1",
      //     entities: [Product,SellerLogin,Admin,Category,SubCategory,BussinessAddressInfo,BusinessInfo,BusinessContactInfo,WebsiteInfo,PersonalInfo,Seller,Review,WishList],
      //     synchronize: true,
      //     autoLoadEntities: true,
      //     logging: false,
      // }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: 'postgres://e_commerce_m6s1_user:HFkAAkgCoooceXHYOXF7GAgv6ps9zD2X@dpg-cohlas5jm4es739as3hg-a.singapore-postgres.render.com/e_commerce_m6s1',
        // url:`postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
        entities:[Product,SellerLogin,Admin,Category,SubCategory,BussinessAddressInfo,BusinessInfo,BusinessContactInfo,WebsiteInfo,PersonalInfo,Seller,Review,WishList],
        ssl:true,
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
      }),
    ],
  })
  
export class DataBaseConnection{}