// src/utils/id-generator.js
import { randomUUID } from 'crypto';

// Helper function for generating unique 10 character IDs. Creates a UUID, removes dashes, and then truncates it to 10 characters
export function generateUniqueId() {
  return randomUUID().replace(/-/g, '').substring(0, 10);
}