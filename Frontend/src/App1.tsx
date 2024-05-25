import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './layouts/Navbar'; 
import Categories from './Category/Categories';
import Products from './Product/Products';

interface Category {
  id_categorie: number;
  type: string;
}

interface Product {
  id: number;
  nom: string;
  description: string;
  categoryIdCategorie: number;
  photo: string;
}

function App() {
  const [type, setType] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>('categories');  // Changer 'produit' à 'categories'
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [nom, setNom] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [categoryIdCategorie, setCategoryIdCategorie] = useState<number>(0);
  const [photo, setPhoto] = useState<string>('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:3004/api/categorie');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:3004/api/produits');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits :", error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const handleCategorySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let response;
      if (editingCategory) {
        response = await fetch(`http://localhost:3004/api/categorie/${editingCategory.id_categorie}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type }),
        });
      } else {
        response = await fetch('http://localhost:3004/api/categorie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type }),
        });
      }
      const updatedCategory: Category = await response.json();
      if (editingCategory) {
        setCategories(categories.map(cat => (cat.id_categorie === updatedCategory.id_categorie ? updatedCategory : cat)));
      } else {
        setCategories([...categories, updatedCategory]);
      }
      setType('');
      setShowModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification de la catégorie :", error);
    }
  };

  const handleProductSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let response;
      if (editingProduct) {
        response = await fetch(`http://localhost:3004/api/produits/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nom, description, categoryIdCategorie, photo }),
        });
      } else {
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
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout/modification du produit :", error);
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category);
    setType(category.type);
    setShowModal(true);
  };

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setNom(product.nom);
    setDescription(product.description);
    setCategoryIdCategorie(product.categoryIdCategorie);
    setPhoto(product.photo);
    setShowModal(true);
  };

  const handleCategoryDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:3004/api/categorie/${id}`, {
        method: 'DELETE',
      });
      setCategories(categories.filter(category => category.id_categorie !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

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

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Navbar setActivePage={setActivePage} />
      {activePage === 'categories' && (
        <Categories
          categories={categories}
          showModal={showModal}
          type={type}
          editingCategory={editingCategory}
          onEdit={handleCategoryEdit}
          onDelete={handleCategoryDelete}
          onShowModal={() => setShowModal(true)}
          onHideModal={() => setShowModal(false)}
          onTypeChange={setType}
          onSubmit={handleCategorySubmit}
        />
      )}
      {activePage === 'products' && (
        <Products
          products={products}
          showModal={showModal}
          nom={nom}
          description={description}
          categoryIdCategorie={categoryIdCategorie}
          photo={photo}
          editingProduct={editingProduct}
          onEdit={handleProductEdit}
          onDelete={handleProductDelete}
          onShowModal={() => setShowModal(true)}
          onHideModal={() => setShowModal(false)}
          onNomChange={setNom}
          onDescriptionChange={setDescription}
          onCategoryIdChange={setCategoryIdCategorie}
          onPhotoChange={setPhoto}
          onSubmit={handleProductSubmit}
        />
      )}
    </div>
  );
}

export default App;
