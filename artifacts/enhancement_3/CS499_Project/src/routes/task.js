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
router.get('/views', async (req, res, next) => {
  try {
    const tasks = await req.services.taskService.getAllTasks();
    res.render('tasks', { tasks });
  } catch (err) {
    next(err);
  }
});
router.get('/:id', getTaskById);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;