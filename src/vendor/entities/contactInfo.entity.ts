/* eslint-disable prettier/prettier */
// contact-info.entity.ts

import { Entity, Column, OneToOne } from 'typeorm';
import { Seller } from './seller.entity';
import { BaseEntity } from 'src/Base_Entities/Base_Entities';

@Entity()
export class BusinessContactInfo  extends BaseEntity{

  @Column()
  primaryEmail: string;

  @Column({ nullable: true })
  secondaryEmail: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  alternateNumber: string;

  @OneToOne(() => Seller, (seller) => seller.contactInfo)
  seller: Seller;
}
