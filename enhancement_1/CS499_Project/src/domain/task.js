// src/domain/task.js
import { generateUniqueId } from '../utils/unique-id-generator.js';
import ValidationError from '../errors/error-validation.js';
import { maxLength, notBlank } from '../utils/validators.js';

export default class Task {
  #id;
  #name;
  #description;

  // Constructor to create a new Task object with parameters (unique ID, name, and description)
  constructor({ name, description }) {
    this.#id = generateUniqueId();
    this.setName(name);
    this.setDescription(description);
  }

  // Block of getters
  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  // Block of setters with validation
  setName(name) {
    try {
      this.#name = maxLength(notBlank(name, 'Name'), 20, 'Name');
    } catch (e) {
      throw new ValidationError(e.message);
    }
  }

  setDescription(description) {
    try {
      this.#description = maxLength(notBlank(description, 'Description'), 50, 'Description');
    } catch (e) {
      throw new ValidationError(e.message);
    }
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description
    };
  }
}