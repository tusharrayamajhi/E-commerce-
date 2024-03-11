/* eslint-disable prettier/prettier */
// business-info.entity.ts

import { Entity, Column, OneToOne } from 'typeorm';
import { Seller } from './seller.entity';
import { BaseEntity } from 'src/Base_Entities/Base_Entities';

@Entity()
export class BusinessInfo extends BaseEntity {
 
  @Column()
  businessName: string;

  @Column()
  registrationNumber: string;

  @Column()
  businessType: string;

  @Column({ nullable: true })
  dateEstablished: Date;

  @OneToOne(() => Seller, (seller) => seller.businessInfo)
  seller: Seller;
}
