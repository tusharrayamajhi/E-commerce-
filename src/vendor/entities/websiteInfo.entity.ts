/* eslint-disable prettier/prettier */
// website-info.entity.ts

import { Entity, Column, OneToOne } from 'typeorm';
import { Seller } from './seller.entity';
import { BaseEntity } from 'src/Base_Entities/Base_Entities';

@Entity()
export class WebsiteInfo extends BaseEntity{

  @Column({ nullable: true })
  websiteLink: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  youtube: string;

  @OneToOne(() => Seller, (seller) => seller.websiteInfo)
  seller: Seller;
}
