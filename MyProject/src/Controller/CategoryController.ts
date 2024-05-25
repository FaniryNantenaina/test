import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Categorie } from '../entity/Categorie';

// Fonction pour créer une catégorie
export const createCategorie = async (req: Request, res: Response) => {
    try {
        const { type } = req.body;
        const categorie = new Categorie();
        categorie.type = type;
        const newCategorie = await AppDataSource.manager.save(categorie);
        res.json(newCategorie);
    } catch (error) {
        console.error("Erreur lors de la création de la catégorie :", error);
        return res.status(500).json({ message: "Erreur lors de la création de la catégorie" });
    }
};

// Fonction pour récupérer toutes les catégories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await AppDataSource.manager.find(Categorie);
        res.json(categories);
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
        return res.status(500).json({ message: "Erreur lors de la récupération des catégories" });
    }
};

// Fonction pour supprimer une catégorie
export const deleteCategorie = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const categorie = await AppDataSource.manager.findOne(Categorie, { where: { id_categorie: id } });

        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        await AppDataSource.manager.remove(categorie);
        res.json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error);
        return res.status(500).json({ message: "Erreur lors de la suppression de la catégorie" });
    }
};

// Fonction pour mettre à jour une catégorie
export const updateCategorie = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { type } = req.body;

        let categorie = await AppDataSource.manager.findOne(Categorie, { where: { id_categorie: id } });

        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        categorie.type = type;
        const updatedCategorie = await AppDataSource.manager.save(categorie);
        res.json(updatedCategorie);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie :", error);
        return res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie" });
    }
};
