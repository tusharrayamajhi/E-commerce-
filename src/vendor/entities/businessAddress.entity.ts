/* eslint-disable prettier/prettier */
// address-info.entity.ts

import { Entity, Column, OneToOne } from 'typeorm';
import { Seller } from './seller.entity';
import { BaseEntity } from 'src/Base_Entities/Base_Entities';

@Entity()
export class BussinessAddressInfo  extends BaseEntity {
 
  @Column()
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  apartment: string;

  @Column()
  zipcode: string;

  @OneToOne(() => Seller, (seller) => seller.addressInfo)
  seller: Seller;
}
