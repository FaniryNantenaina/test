import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Categorie } from "./Categorie";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 45 })
    nom: string

    @Column({ length: 45 })
    
    description: string

    @Column()
    photo: string

    @ManyToOne(() => Categorie, category => category.products)
  category: Categorie;
 

}
