/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

//   @ManyToOne(() => Product, (product) => product.variants)
//   product: Product;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  stock: number;
}