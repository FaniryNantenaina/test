import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Product } from "./Product";


@Entity()
export class Categorie {

    @PrimaryGeneratedColumn()
    id_categorie: number

    @Column({ length: 45})
    type: string

 @OneToMany(() => Product, produit => produit.category)
  products: Product[];


}
