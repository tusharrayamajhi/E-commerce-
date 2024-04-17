/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { BussinessAddressInfo } from './entities/businessAddress.entity';
import { BusinessContactInfo } from './entities/contactInfo.entity';
import { WebsiteInfo } from './entities/websiteInfo.entity';
import { PersonalInfo } from './entities/personalInfo.entity';
import { BusinessInfo } from './entities/businessInfo.entity';
import { SellerLogin } from './entities/Sellerlogin.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BussinessAddressInfo,BusinessInfo,BusinessContactInfo,WebsiteInfo,PersonalInfo,Seller,SellerLogin])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
