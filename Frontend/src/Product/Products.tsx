import React, { useState, useEffect } from 'react';
import { getAllCategory } from '../services/category';

export interface Category {
  id_categorie: number;
  type: string;
}

export interface Product {
  id: number;
  nom: string;
  description: string;
  // categoryIdCategorie: number;
  category: Category;
  photo: string;
}



const Products: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open,setOpen] = useState<boolean>(false);

    
  const [products, setProducts] = useState<Product[]>([]);
  const [nom, setNom] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryIdCategorie, setCategoryIdCategorie] = useState<number>(0);
  const [photo, setPhoto] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  // Fonction pour charger les produits depuis l'API
  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:3004/api/produits');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  };

  const handleProductSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let response;
      if (editingProduct) {
        // Requête PUT pour modifier un produit existant
        response = await fetch(`http://localhost:3004/api/produits/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nom, description, categoryIdCategorie, photo }),
        });
      } else {
        // Requête POST pour ajouter un nouveau produit
        response = await fetch('http://localhost:3004/api/produits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nom, description, categoryIdCategorie, photo }),
        });
      }
      const updatedProduct: Product = await response.json();
      if (editingProduct) {
        setProducts(products.map(prod => (prod.id === updatedProduct.id ? updatedProduct : prod)));
      } else {
        setProducts([...products, updatedProduct]);
      }
      setNom('');
      setDescription('');
      setCategoryIdCategorie(0);
      setPhoto('');
      setOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification du produit :", error);
    }
  };

  

  // Fonction pour démarrer l'édition d'un produit
  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setNom(product.nom);
    setDescription(product.description);
    setCategoryIdCategorie(product.category.id_categorie);
    setPhoto(product.photo);
    setOpen(true);
  };



  // Fonction pour supprimer un produit
  const handleProductDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3004/api/produits/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    }
  };

  const loadCategories = async () => {
    const data = await getAllCategory();
    setCategories(data);
  };

  useEffect(() =>{loadProducts(); loadCategories()},[])

  return (
    <div>
      <button className="add-product-button" onClick={() => setOpen(true)}>Ajouter un produit</button>
      <h2>LISTE DES PRODUITS</h2>
      {open && (
        <div className="modal" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>{editingProduct ? "Modifier" : "Ajouter"} un produit</h2>
            <form onSubmit={handleProductSubmit} style={{
              padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="nom" style={{ marginBottom: '5px', display: 'block' }}>Nom :</label>
                <input
                  type="text"
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  style={{ padding: '8px', fontSize: '16px', width: '100%', borderRadius: '3px', border: '1px solid #ccc' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="description" style={{ marginBottom: '5px', display: 'block' }}>Description :</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ padding: '8px', fontSize: '16px', width: '100%', borderRadius: '3px', border: '1px solid #ccc' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="categoryIdCategorie" style={{ marginBottom: '5px', display: 'block' }}>Catégorie :</label>
                <select
                  id="categoryIdCategorie"
                  value={categoryIdCategorie}
                  onChange={(e) => setCategoryIdCategorie(parseInt(e.target.value))}
                  style={{ padding: '8px', fontSize: '16px', width: '100%', borderRadius: '3px', border: '1px solid #ccc' }}
                  required
                >
                  <option value="" disabled>Choisir une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id_categorie} value={category.id_categorie}>
                      {category.type}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="photo" style={{ marginBottom: '5px', display: 'block' }}>Photo :</label>
                <input
                  type="text"
                  id="photo"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  style={{ padding: '8px', fontSize: '16px', width: '100%', borderRadius: '3px', border: '1px solid #ccc' }}
                  required
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button type="submit" style={{
                  padding: '10px 20px', fontSize: '16px', backgroundColor: '#007BFF',
                  color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer'
                }}>{editingProduct ? "Ajouter la modification" : "Ajouter le produit"}</button>
              </div>
            </form>
            <button onClick={() => setOpen(false)} style={{
              padding: '10px 20px', fontSize: '16px', backgroundColor: '#f44336',
              color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginTop: '10px'
            }}>Fermer</button>
          </div>
        </div>
      )}
           <div className="list-container" style={{ flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid #ddd' }}>
          <thead>
            <tr>
              <th style={{
                border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2',
                textAlign: 'center'
              }}>ID</th>
              <th style={{
                border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2',
                textAlign: 'center'
              }}>Nom</th>
              <th style={{
                border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2',
                textAlign: 'center'
              }}>Description</th>
              <th style={{
                border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2',
                textAlign: 'center'
              }}>Catégorie</th>
              <th style={{
                border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2',
                textAlign: 'center'
              }}>Photo</th>
              <th style={{
                border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2',
                textAlign: 'center'
              }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{product.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{product.nom}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{product.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{ product.category.type }</td>
                {/* <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{categoryMap[product.categoryIdCategorie]}</td> */}
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{product.photo}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  <button onClick={() => handleProductEdit(product)} style={{
                    backgroundColor: '#ffc107', color: 'white', border: 'none', borderRadius: '3px',
                    cursor: 'pointer', marginRight: '5px', padding: '8px'
                  }}>Éditer</button>
                  <button onClick={() => handleProductDelete(product.id)} style={{
                    backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px',
                    cursor: 'pointer', padding: '8px'
                  }}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

