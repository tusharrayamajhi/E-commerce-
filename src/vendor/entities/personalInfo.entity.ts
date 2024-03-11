/* eslint-disable prettier/prettier */
// personal-info.entity.ts

import { Entity, Column, OneToOne } from 'typeorm';
import { Seller } from './seller.entity';
import { BaseEntity } from 'src/Base_Entities/Base_Entities';

@Entity()
export class PersonalInfo extends BaseEntity{

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  gender: string;

  @OneToOne(() => Seller, (seller) => seller.personalInfo)
  seller: Seller;
}
