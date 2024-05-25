import express from 'express';
import {createProduct } from '../controller/ProductController'; // Modifier le chemin pour correspondre au dossier 'controllers'

const router = express.Router();
//router.get('/products', productController.getAllProducts);
//router.get('/products/:id', productController.getProductById);
router.post('/product',createProduct);
//router.put('/products/:id', productController.updateProduct);
//router.delete('/products/:id', productController.deleteProduct);

export default router;
