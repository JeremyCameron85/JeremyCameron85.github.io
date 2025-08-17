// src/utils/validators.js
import NotFoundError from '../errors/error-not-found.js';

// Function to check if the ID exists in the Map and throws a NotFoundError if it does not
export function ensureIdExists(map, id, entityName = 'Entity') {
    if (!map.has(id)) {
      throw new NotFoundError(`${entityName} ID does not exist: ${id}`);
    }
  }

// Function to check if input is null or undefined and throws an error if it is
export function requireNonNull(value, fieldName) {
  if (value === null || value === undefined) {
    throw new Error(`${fieldName} cannot be null or undefined.`);
  }
}

// Function to check the input's length and throws an error if it is too long, otherwise returns the value
export function maxLength(value, max, fieldName) {
  requireNonNull(value, fieldName);
  if (value.length > max) {
    throw new Error(`${fieldName} cannot be longer than ${max} characters.`);
  }
  return value;
}

// Function to check if the input contains an exact number of digits and throws an error if it does not, otherwise returns the trimmed value
export function exactDigits(value, digits, fieldName) {
  requireNonNull(value, fieldName);
  const re = new RegExp(`^\\d{${digits}}$`);
  if (!re.test(value)) {
    throw new Error(`${fieldName} must be exactly ${digits} digits.`);
  }
  return value.trim();
}

// Function to check if the input is empty or contains only spaces and throws an error if so, otherwise returns the trimmed value
export function notBlank(value, fieldName) {
  requireNonNull(value, fieldName);
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${fieldName} cannot be empty or only spaces.`);
  }
  return value.trim();
}

// Function to check if the date is valid format and not in the past. Throws an error if it is invalid, otherwise returns the date
export function validateDate(value, fieldName) {
  if (value === null || value === undefined) {
    throw new Error(`${fieldName} cannot be null or undefined.`);
  }

  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) {
    throw new Error(`${fieldName} is not a valid date.`);
  }

  if (date < new Date()) {
    throw new Error(`${fieldName} cannot be in the past.`);
  }

  return date;
}

// Function to validate prefix queries
export function validatePrefix(rawPrefix, fieldName = 'Prefix', max = 20) {
  return maxLength(notBlank(rawPrefix, fieldName), max, fieldName);
}