// src/services/contact-service.js
import Contact from '../domain/contact.js';
import DuplicateIdError from '../errors/error-duplicate-id.js';
import { ensureIdExists } from '../utils/validators.js';

export default class ContactService {
  // Creates a new private Map to store contacts by ID
  #contacts = new Map();

  // Method to add a new contact
  addContact(data) {
    // If ID is provided, checks if it already exists.
    const idToCheck = data.id ?? null;
    if (idToCheck && this.#contacts.has(idToCheck)) {
      throw new DuplicateIdError(`Contact ID already exists: ${idToCheck}`);
    }

    // Creates a new contact and checks if the generated ID already exists
    const contact = new Contact(data);
    if (this.#contacts.has(contact.id)) {
      throw new DuplicateIdError(`Contact ID already exists: ${contact.id}`);
    }
    // Stores the new contact in the Map and returns it
    this.#contacts.set(contact.id, contact);
    return contact;
  }

  // Method to delete a contact
  deleteContact(id) {
    // Verifies the ID exists before trying to delete
    ensureIdExists(this.#contacts, id, 'Contact');
    this.#contacts.delete(id);
  }

  // Method to update a contact's first name
  updateFirstName(id, firstName) {
    const contact = this.getContact(id);
    contact.setFirstName(firstName);
    return contact;
  }

  // Method to update a contact's last name
  updateLastName(id, lastName) {
    const contact = this.getContact(id);
    contact.setLastName(lastName);
    return contact;
  }

  // Method to update a contact's phone number
  updatePhoneNumber(id, phoneNumber) {
    const contact = this.getContact(id);
    contact.setPhoneNumber(phoneNumber);
    return contact;
  }

  // Method to update a contact's address
  updateAddress(id, address) {
    const contact = this.getContact(id);
    contact.setAddress(address);
    return contact;
  }

  // Method to retrieve a contact
  getContact(id) {
    // Verifies the ID exists before trying to retrieve
    ensureIdExists(this.#contacts, id, 'Contact');
    return this.#contacts.get(id);
  }

  // Method to retrieve all contacts as an array JSON objects
  getAllContacts() {
    return Array.from(this.#contacts.values()).map(c => c.toJSON());
  }
}