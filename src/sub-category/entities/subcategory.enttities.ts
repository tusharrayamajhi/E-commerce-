/* eslint-disable prettier/prettier */
import { ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from "src/Base_Entities/Base_Entities";
import { Category } from "src/category/entities/Category.entities";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity()
@Unique(["name"])
export class SubCategory extends BaseEntity{
    @Column()
    name:string

    @ManyToOne(()=>Category,(category)=>category.subCategory)
    category:Category

    @OneToMany(()=>Product,(product)=>product.category)
    product:Product[]
}