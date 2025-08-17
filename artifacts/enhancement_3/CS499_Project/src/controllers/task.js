// src/controllers/task.js
import { validatePrefix } from '../utils/validators.js';

// Function to create a new task
export async function createTask(req, res, next) {
  try {
    const task = await req.services.taskService.addTask(req.body);
    res.status(201).json(task.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to retrieve all tasks
export async function getTasks(req, res, next) {
  try {
    const tasks = await req.services.taskService.getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

// Function to retrieve a task by its ID
export async function getTaskById(req, res, next) {
  try {
    const task = await req.services.taskService.getTask(req.params.id);
    res.json(task.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to update a task
export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    // If neither field is provided, returns current task unchanged.
    if (name === undefined && description === undefined) {
        const existing = await req.services.taskService.getTask(req.params.id);
        return res.json(existing.toJSON());
    }
    const updated = await req.services.taskService.updateTask(id, name, description);
    res.json(updated.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to delete a task
export async function deleteTask(req, res, next) {
  try {
    await req.services.taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Function to validate and search tasks by prefix for name
export async function searchNamePrefix(req, res, next) {
  try {
    const prefix = validatePrefix(req.query.prefix, 'Task name prefix');
    const results = await req.services.taskService.searchNamePrefix(prefix);
    res.json(results);
  } catch (err) {
    next(err);
  }
}