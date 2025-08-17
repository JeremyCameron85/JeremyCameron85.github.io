// src/domain/appointment.js
import { generateUniqueId } from '../utils/unique-id-generator.js';
import ValidationError from '../errors/error-validation.js';
import { maxLength, validateDate, notBlank } from '../utils/validators.js';

export default class Appointment {
  #id;
  #date;
  #description;

  // Constructor to create a new Appointment object with parameters (unique ID, date, and description)
  constructor({ date, description }) {
    this.#id = generateUniqueId();
    this.setDate(date);
    this.setDescription(description);
  }

  // Block of getters
  get id() {
    return this.#id;
  }

  get date() {
    return this.#date;
  }

  get description() {
    return this.#description;
  }

  // Block of setters with validation
  setDate(value) {
    try {
      this.#date = validateDate(value, 'Date');
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
      date: this.#date,
      description: this.#description
    };
  }
}