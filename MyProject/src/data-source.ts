import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
import { Categorie } from "./entity/Categorie"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mabase",
    synchronize: true,
    logging: false,
    entities: [User,Product,Categorie],
    migrations: [],
    subscribers: [],
})
