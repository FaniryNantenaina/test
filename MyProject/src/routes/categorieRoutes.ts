import express from 'express';
import { createCategorie } from '../controller/CategoryController';

const router = express.Router();

router.post('/categorie', createCategorie);
// router.get('/categories/:id', categoryController.getCategoryById);
// router.post('/categories', categoryController.createCategory);
// router.put('/categories/:id', categoryController.updateCategory);
// router.delete('/categories/:id', categoryController.deleteCategory);

export default router;
