/* eslint-disable prettier/prettier */
import { Column, Entity, OneToOne } from "typeorm"
import { Seller } from "./seller.entity"
import { BaseEntity } from "src/Base_Entities/Base_Entities"



@Entity()
export class SellerLogin extends BaseEntity{
    @Column()
    email:string

    @Column()
    password:string

    @OneToOne(()=>Seller,(seller) =>seller.login)
    seller:Seller
}