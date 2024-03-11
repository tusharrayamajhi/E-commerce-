/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/Base_Entities/Base_Entities";
import { WishList } from "src/wishlist/entities/wishlist.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
    @Column({nullable:false})
    firstName:string

    @Column({nullable:true})
    middleName:string

    @Column({nullable:false})
    email:string

    @Column({nullable:false})
    password:string

    @Column({default:false})
    isVerify:boolean

    @OneToMany(()=>WishList,(wishlist)=>wishlist.user)
    wishlist:WishList[]
}
