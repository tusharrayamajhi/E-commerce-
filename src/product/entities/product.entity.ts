/* eslint-disable prettier/prettier */

import { BaseEntity } from 'src/Base_Entities/Base_Entities';
import { Review } from 'src/review/entities/review.entity';
import { SubCategory } from 'src/sub-category/entities/subcategory.enttities';
import { Seller } from 'src/vendor/entities/seller.entity';
import { WishList } from 'src/wishlist/entities/wishlist.entity';
import { Entity, Column, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Product extends BaseEntity{

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  stock: number

  @Column({ nullable: true,default:0})
  discount: number

  @Column('simple-array')
  images: string[]

  @ManyToOne(()=>SubCategory,(category)=>category.product)
  category: SubCategory

  @OneToMany(()=>Review,(review)=>review.product)
  review:Review[]

  @ManyToOne(() => Seller, vendor => vendor.products)
  seller: Seller

  @OneToMany(()=>WishList,(wishlist)=>wishlist.product)
  wishlist:WishList[]
}