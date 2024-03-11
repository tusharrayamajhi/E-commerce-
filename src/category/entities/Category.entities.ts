/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/Base_Entities/Base_Entities";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { SubCategory } from 'src/sub-category/entities/subcategory.enttities';


@Entity()
@Unique(["name"])
export class Category extends BaseEntity{

    @Column()
    name:string
    
    @OneToMany(()=>SubCategory,(product)=>product.category)
    subCategory:SubCategory[]
}