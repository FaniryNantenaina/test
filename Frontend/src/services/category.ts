import { Category } from "../Product/Products";


export const getAllCategory = async () :Promise<Category[]> => {
    try {
      const response = await fetch('http://localhost:3004/api/categorie');
      const data = await response.json();
      

      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);

      return []
    }
};