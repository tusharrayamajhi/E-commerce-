/* eslint-disable prettier/prettier */
// seller.entity.ts

import {OneToMany, Entity, OneToOne, JoinColumn, Column } from 'typeorm';
import { PersonalInfo } from './personalInfo.entity';
import { BusinessContactInfo } from './contactInfo.entity';
import { BusinessInfo } from './businessInfo.entity';
import { BussinessAddressInfo } from './businessAddress.entity';
import { WebsiteInfo } from './websiteInfo.entity';
import { BaseEntity } from 'src/Base_Entities/Base_Entities';
import { Product } from 'src/product/entities/product.entity';
import { SellerLogin } from './Sellerlogin.entity';

@Entity()
export class Seller extends BaseEntity {
  @OneToOne(() => PersonalInfo, { cascade: true, eager: true })
  @JoinColumn()
  personalInfo: PersonalInfo

  @OneToOne(() => BusinessContactInfo, { cascade: true, eager: true })
  @JoinColumn()
  contactInfo: BusinessContactInfo

  @OneToOne(() => BusinessInfo, { cascade: true, eager: true })
  @JoinColumn()
  businessInfo: BusinessInfo

  @OneToOne(() => BussinessAddressInfo, { cascade: true, eager: true })
  @JoinColumn()
  addressInfo: BussinessAddressInfo

  @OneToOne(() => WebsiteInfo, { cascade: true, eager: true })
  @JoinColumn()
  websiteInfo: WebsiteInfo

  @OneToOne(()=>SellerLogin,(sellerlogin)=>sellerlogin.seller,{cascade:true,eager:true})
  @JoinColumn()
  login:SellerLogin

  @Column({default:false})
  isvendor:boolean

  @OneToMany(()=>Product,(product)=>product.seller)
  products:Product[]



}
