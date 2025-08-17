// src/services/contact-service.js
import Contact from '../domain/contact.js';
import DuplicateIdError from '../errors/error-duplicate-id.js';
import { ensureIdExists } from '../utils/validators.js';
import { Trie } from '../utils/trie.js';

export default class ContactService {
  // Creates a new private Map to store contacts by ID
  #contacts = new Map(); 
  // Creates new private Tries for storing first and last names
  #trieFirstName = new Trie();
  #trieLastName = new Trie();

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
    // Stores the first and last names inside the Trie
    this.#trieFirstName.insert(contact.firstName, contact.id);
    this.#trieLastName.insert(contact.lastName, contact.id);
    return contact;
  }

  // Method to delete a contact
  deleteContact(id) {
    // Retrieves the contact
    const contact = this.getContact(id);
    // Deletes the first and last names stored in the Trie
    this.#trieFirstName.delete(contact.firstName, id);
    this.#trieLastName.delete(contact.lastName, id);
    // Deletes the contact ID from the Map
    this.#contacts.delete(id);
  }

  // Method to update a contact's first name
  updateFirstName(id, newFirstName) {
    const contact = this.getContact(id);
    // Checks if old first name matches the new first name
    if (contact.firstName != newFirstName) {
      // Deletes the old first name from the Trie
      this.#trieFirstName.delete(contact.firstName, id);
      // Updates new first name into the Trie
      contact.setFirstName(newFirstName);
      this.#trieFirstName.insert(newFirstName, id);
    }
    return contact;
  }

  // Method to update a contact's last name
  updateLastName(id, newLastName) {
    // Retrieves the contact
    const contact = this.getContact(id);
    // Checks if old last name matches the new last name
    if (contact.lastName != newLastName) {
      // Deletes the old last name from the Trie
      this.#trieLastName.delete(contact.lastName, id);
      // Updates new last name into the Trie
      contact.setLastName(newLastName);
      this.#trieLastName.insert(newLastName, id);
    }
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

  // Method to search contacts by prefix for first name
  searchFirstNamePrefix(prefix) {
    const ids = this.#trieFirstName.searchPrefix(prefix);
    return Array.from(ids).map(id => this.#contacts.get(id).toJSON());
  }

  // Method to search contacts by prefix for last name
  searchLastNamePrefix(prefix) {
    const ids = this.#trieLastName.searchPrefix(prefix);
    return Array.from(ids).map(id => this.#contacts.get(id).toJSON());
  }

  // Method to search contacts by prefix for both first and last name
  searchFullNamePrefix(prefixFirstName, prefixLastName) {
    const idsFirstName = this.#trieFirstName.searchPrefix(prefixFirstName);
    const idsLastName = this.#trieLastName.searchPrefix(prefixLastName);
    const nameIntersect = new Set([...idsFirstName].filter(id => idsLastName.has(id)));
    return Array.from(nameIntersect).map(id => this.#contacts.get(id).toJSON());
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