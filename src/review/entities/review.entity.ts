/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/Base_Entities/Base_Entities";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Review extends BaseEntity {
    @Column({default:0})
    rating:number

    @Column({nullable:true})
    comment:string

    @ManyToOne(()=>Product,(product)=>product.review)
    product:Product

    // @ManyToOne(()=>User,(user)=>user.review)
    // user:User
}
