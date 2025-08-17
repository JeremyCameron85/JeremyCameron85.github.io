// src/errors/DuplicateIdError.js
// Error message when a duplicate ID is detected
export default class DuplicateIdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DuplicateIdError';
    this.status = 409;
  }
}