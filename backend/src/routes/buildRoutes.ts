import express from 'express';
import * as buildController from '../controllers/buildController';
import { checkAdminAuth } from '../middleware/adminAuth';

const router = express.Router();

router.get('/', buildController.getBuilds); // Public
router.get('/:id', buildController.getBuild); // Public
router.get('/god/:godId', buildController.getBuildsByGod); // Public
router.post('/', checkAdminAuth, buildController.createBuild); // Admin only
router.delete('/:id', checkAdminAuth, buildController.deleteBuild); // Admin only

export default router;