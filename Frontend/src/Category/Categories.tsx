import React, { useEffect, useState } from 'react';
import { Category } from '../Product/Products';
import { getAllCategory } from '../services/category';

const Categories: React.FC = () => {
  const [type, setType] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string>('');

  // Fonction pour supprimer une catégorie avec une alerte de confirmation
  const handleCategoryDelete = async (id: number) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
    if (!confirmed) {
      return;
    }
    
    try {
      await fetch(`http://localhost:3004/api/categorie/${id}`, {
        method: 'DELETE',
      });
      setCategories(categories.filter(category => category.id_categorie !== id));
      setMessage('Catégorie supprimée avec succès.');
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
      setMessage('Erreur lors de la suppression de la catégorie.');
    }
  };

  // Fonction pour charger les catégories depuis l'API
  const loadCategories = async () => {
    const data = await getAllCategory();
    setCategories(data);
  };

  // Fonction pour démarrer l'édition d'une catégorie
  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category);
    setType(category.type);
    setOpen(true);
  };

  // Fonction pour soumettre une nouvelle catégorie ou modifier une catégorie existante
  const handleCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let response;
      if (editingCategory) {
        // Requête PUT pour modifier une catégorie existante
        response = await fetch(`http://localhost:3004/api/categorie/${editingCategory.id_categorie}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type }),
        });
        setMessage('Catégorie modifiée avec succès.');
      } else {
        // Requête POST pour ajouter une nouvelle catégorie
        response = await fetch('http://localhost:3004/api/categorie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type }),
        });
        setMessage('Catégorie ajoutée avec succès.');
      }
      const updatedCategory: Category = await response.json();
      if (editingCategory) {
        setCategories(categories.map(cat => (cat.id_categorie === updatedCategory.id_categorie ? updatedCategory : cat)));
      } else {
        setCategories([...categories, updatedCategory]);
      }
      setType('');
      setOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification de la catégorie :", error);
      setMessage('Erreur lors de l\'ajout ou de la modification de la catégorie.');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      {/* Contenu pour la page des catégories */}
      <button className="add-category-button" onClick={() => setOpen(true)}>Ajouter une catégorie</button>
      <h2>LISTES DES CATEGORIES</h2>
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      {open && (
        <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal-content" style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h2>{editingCategory ? "Modifier" : "Ajouter"} une catégorie</h2> {/* Modifier le titre en fonction de l'édition */}
            <form onSubmit={handleCategorySubmit} style={{ padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="type" style={{ marginBottom: '5px', display: 'block' }}>Type de catégorie :</label>
                <input
                  type="text"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ padding: '8px', fontSize: '16px', width: '100%', borderRadius: '3px', border: '1px solid #ccc' }}
                  required
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>{editingCategory ? "Ajouter la modification" : "Ajouter la catégorie"}</button> {/* Modifier le libellé du bouton en fonction de l'édition */}
              </div>
            </form>
            <button onClick={() => setOpen(false)} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginTop: '10px' }}>Fermer</button>
          </div>
        </div>
      )}
      <div className="list-container" style={{ flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ddd' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>Type</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id_categorie}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{category.id_categorie}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{category.type}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => handleCategoryEdit(category)} style={{ backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '5px', padding: '8px' }}>Éditer</button>
                  <button onClick={() => handleCategoryDelete(category.id_categorie)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', padding: '8px' }}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
