// src/services/task-service.js
import Task from '../domain/task.js';
import DuplicateIdError from '../errors/error-duplicate-id.js';
import { ensureIdExists } from '../utils/validators.js';
import { Trie } from '../utils/trie.js';

export default class TaskService {
  // Creates a new private Map to store tasks by ID
  #tasks = new Map();
  // Creates new private Trie for storing task names
  #trieTaskName = new Trie();

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
    // Stores the task name in the Trie
    this.#trieTaskName.insert(task.name, task.id);
    return task;
  }

  // Method to delete a task
  deleteTask(id) {
    // Verifies the ID exists before trying to delete
    const task = this.getTask(id);
    // Deletes the task named stored in the Trie
    this.#trieTaskName.delete(task.name, id);
    // Deletes the task id from the map
    this.#tasks.delete(id);
  }

  // Method to update a task's name and description
  updateTask(id, newName, description) {
    const task = this.getTask(id);
    // Checks if name is provided or if it matches the old name
    if (task.name != newName) {
      const oldName = task.name;
      // Updates and stores new task name in the Trie
      task.setName(newName);
      this.#trieTaskName.delete(oldName, id);
      this.#trieTaskName.insert(newName, id);
    }
    // Checks if description is provided
    if (description !== undefined) {
      // Updates task with new description
      task.setDescription(description);
    } 
    return task;
  }

  // Method to search tasks by prefix for name
  searchNamePrefix(prefix) {
    const ids = this.#trieTaskName.searchPrefix(prefix);
    return Array.from(ids).map(id => this.#tasks.get(id).toJSON());
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