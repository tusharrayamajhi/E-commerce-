/* eslint-disable prettier/prettier */
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn,Entity, ManyToOne } from "typeorm";


@Entity()
export class WishList{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ManyToOne(()=>User,(user)=>user.wishlist)
    user:User

    @ManyToOne(()=>Product,(product)=>product.wishlist)
    product:Product
}