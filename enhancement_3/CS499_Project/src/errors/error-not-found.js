// src/errors/NotFoundError.js
// Error message when ID is not found
export default class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}