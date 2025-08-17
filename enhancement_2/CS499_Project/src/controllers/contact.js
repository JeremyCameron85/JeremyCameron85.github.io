// src/controllers/contact.js
import ContactService from '../services/contact-service.js';
import { validatePrefix } from '../utils/validators.js';

const contactService = new ContactService();

// Function for creating a new contact
export function createContact(req, res, next) {
  try {
    const contact = contactService.addContact(req.body);
    res.status(201).json(contact.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to retrieve all contacts
export function getContacts(req, res, next) {
  try {
    const contacts = contactService.getAllContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
}

// Function to retrieve a contact by its ID
export function getContactById(req, res, next) {
  try {
    const contact = contactService.getContact(req.params.id);
    res.json(contact.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to update a contact
export function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber, address } = req.body;
    // Returns existing contact if no changes detected
    if (
      firstName === undefined &&
      lastName === undefined &&
      phoneNumber === undefined &&
      address === undefined
    ) {
      const existing = contactService.getContact(id);
      return res.json(existing.toJSON());
    }
    let updated = contactService.getContact(id);
    if (firstName !== undefined) updated = contactService.updateFirstName(id, firstName);
    if (lastName !== undefined)  updated = contactService.updateLastName(id, lastName);
    if (phoneNumber !== undefined) updated = contactService.updatePhoneNumber(id, phoneNumber);
    if (address !== undefined) updated = contactService.updateAddress(id, address);
    res.json(updated.toJSON());
    } catch (err) {
    next(err);
  }
}

// Function to delete a contact
export function deleteContact(req, res, next) {
  try {
    contactService.deleteContact(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Function to validate and search contacts by prefix for first name
export function searchFirstNamePrefix(req, res, next) {
  try {
    const prefix = validatePrefix(req.query.prefix, 'First name prefix');
    const results = contactService.searchFirstNamePrefix(prefix);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

// Function to validate and search contacts by prefix for last name
export function searchLastNamePrefix(req, res, next) {
  try {
    const prefix = validatePrefix(req.query.prefix, 'Last name prefix');
    const results = contactService.searchLastNamePrefix(prefix);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

// Function to validate and search contacts by prefix for both first and last names 
export function searchFullNamePrefix(req, res, next) {
  try {
    const first = validatePrefix(req.query.first, 'First name prefix');
    const last = validatePrefix(req.query.last, 'Last name prefix');
    const results = contactService.searchFullNamePrefix(first, last);
    res.json(results);
  } catch (err) {
    next(err);
  }
}