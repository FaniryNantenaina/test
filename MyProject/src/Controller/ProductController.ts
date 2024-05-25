import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { Categorie } from "../entity/Categorie";

export const createProduct = async (req: Request, res: Response) => {
  const { nom, description, photo, categoryIdCategorie } = req.body;
  const categorie = await AppDataSource.manager.findOne(Categorie, { where: { id_categorie: categoryIdCategorie } });
  if (!categorie) {
    return res.status(404).json({ message: "Categorie not found" });
  }
  const produit = new Product();
  produit.nom = nom;
  produit.description = description;
  produit.photo = photo;
  produit.category = categorie;
  await AppDataSource.manager.save(produit);
  res.json(produit);
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await AppDataSource.manager.find(Product, { relations: ["category"] });
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  
  const id = parseInt(req.params.id);

  try {
    const product = await AppDataSource.manager.findOne(Product, { where: { id } });

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    await AppDataSource.manager.remove(Product, product);
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res.status(500).json({ message: "Erreur lors de la suppression du produit" });
  }
};

