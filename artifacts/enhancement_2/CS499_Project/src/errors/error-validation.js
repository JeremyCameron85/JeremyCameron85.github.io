// src/errors/ValidationError.js
// Error message when validation fails (For example, if input is blank or too long)
export default class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}