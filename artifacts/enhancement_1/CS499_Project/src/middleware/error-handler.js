// src/middleware/errorHandler.js
// Helper function to format and send errors
export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const payload = {
    error: err.name || 'Error',
    message: err.message || 'Unexpected error'
  };
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
}