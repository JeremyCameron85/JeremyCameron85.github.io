// src/controllers/task.js
import TaskService from '../services/task-service.js';

const taskService = new TaskService();

// Function to create a new task
export function createTask(req, res, next) {
  try {
    const task = taskService.addTask(req.body);
    res.status(201).json(task.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to retrieve all tasks
export function getTasks(req, res, next) {
  try {
    const tasks = taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

// Function to retrieve a task by its ID
export function getTaskById(req, res, next) {
  try {
    const task = taskService.getTask(req.params.id);
    res.json(task.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to update a task
export function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // If neither field is provided, returns current task unchanged.
    if (name === undefined && description === undefined) {
        const existing = taskService.getTask(id);
        return res.json(existing.toJSON());
    }

    const updated = taskService.updateTask(id, name, description);
    res.json(updated.toJSON());
  } catch (err) {
    next(err);
  }
}

// Delete
export function deleteTask(req, res, next) {
  try {
    taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}