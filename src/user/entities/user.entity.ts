/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/Base_Entities/Base_Entities";
import { Review } from "src/review/entities/review.entity";
import { WishList } from "src/wishlist/entities/wishlist.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, Unique } from "typeorm";

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
    
    @OneToMany(()=>Review,(review)=>review.user)
    review:Review[]

    // @OneToOne(()=>Cart)
    // @JoinColumn()
    // cart:Cart
}
