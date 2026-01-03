import express from 'express';
import * as itemController from '../controllers/itemController';
import { checkAdminAuth } from '../middleware/adminAuth';

const router = express.Router();

router.get('/', itemController.getItems); // Public
router.get('/:id', itemController.getItem); // Public
router.post('/', checkAdminAuth, itemController.createItem); // Admin only
router.put('/:id', checkAdminAuth, itemController.updateItem); // Admin only
router.delete('/:id', checkAdminAuth, itemController.deleteItem); // Admin only

export default router;