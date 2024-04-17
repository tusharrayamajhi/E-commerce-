/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
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
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: "mysql",
          host: process.env.DATABASE_HOST,
          port: configService.get<number>('DATABASE_PORT'),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [Product,SellerLogin,Admin,Category,SubCategory,BussinessAddressInfo,BusinessInfo,BusinessContactInfo,WebsiteInfo,PersonalInfo,Seller,Review,WishList],
          synchronize: true,
          autoLoadEntities: true,
          logging: false,
        }),
      }),
    ],
  })
  
export class DataBaseConnection{}