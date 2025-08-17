// src/routes/task.js
import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  searchNamePrefix,
  updateTask,
  deleteTask  
} from '../controllers/task.js';

const router = Router();

router.get('/', getTasks);
router.get('/search/name', searchNamePrefix);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;