import express from 'express';
import { createCategorie, getCategories , deleteCategorie , updateCategorie } from '../controller/CategoryController';
import {createProduct , getProducts ,deleteProduct } from '../controller/ProductController'; 
const router = express.Router();

router.post('/categorie', createCategorie);
router.get('/categorie', getCategories);
// router.post('/categories', categoryController.createCategory);
router.put('/categorie/:id', updateCategorie);
router.delete('/categorie/:id', deleteCategorie);
router.post('/produits',createProduct);
router.delete('/produits/:id', deleteProduct); 
router.get("/produits", getProducts);
export default router;
