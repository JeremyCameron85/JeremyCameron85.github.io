// src/services/task-service.js
import Task from '../domain/task.js';
import DuplicateIdError from '../errors/error-duplicate-id.js';
import { ensureIdExists } from '../utils/validators.js';

export default class TaskService {
  // Creates a new private Map to store tasks by ID
  #tasks = new Map();

  // Method to add a new task
  addTask(data) {
    // If ID is provided, checks if it already exists.
    const idToCheck = data.id ?? null;
    if (idToCheck && this.#tasks.has(idToCheck)) {
      throw new DuplicateIdError(`Task ID already exists: ${idToCheck}`);
    }

    // Creates a new task and checks if the generated ID already exists
    const task = new Task(data);
    if (this.#tasks.has(task.id)) {
      throw new DuplicateIdError(`Task ID already exists: ${task.id}`);
    }
    // Stores the new task in the Map and returns it
    this.#tasks.set(task.id, task);
    return task;
  }

  // Method to delete a task
  deleteTask(id) {
    // Verifies the ID exists before trying to delete
    ensureIdExists(this.#tasks, id, 'Task');
    this.#tasks.delete(id);
  }

  // Method to update a task's name and description
  updateTask(id, name, description) {
    const task = this.getTask(id);
    // Checks if name and/or description are provided
    if (name !== undefined) task.setName(name);
    if (description !== undefined) task.setDescription(description);
    return task;
  }


  // Method to retrieve a task
  getTask(id) {
    ensureIdExists(this.#tasks, id, 'Task');
    return this.#tasks.get(id);
  }

  // Method to retrieve all tasks as an array of JSON objects
  getAllTasks() {
    return Array.from(this.#tasks.values()).map(c => c.toJSON());
  }
}