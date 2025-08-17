// src/controllers/contact.js
import { validatePrefix } from '../utils/validators.js';

// Function for creating a new contact
export async function createContact(req, res, next) {
  try {
    const contact = await req.services.contactService.addContact(req.body);
    res.status(201).json(contact.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to retrieve all contacts
export async function getContacts(req, res, next) {
  try {
    const contacts = await req.services.contactService.getAllContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
}

// Function to retrieve a contact by its ID
export async function getContactById(req, res, next) {
  try {
    const contact = await req.services.contactService.getContact(req.params.id);
    res.json(contact.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to update a contact
export async function updateContact(req, res, next) {
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
      const existing = await req.services.contactService.getContact(id);
      return res.json(existing.toJSON());
    }
    let updated = await req.services.contactService.getContact(id);
    if (firstName !== undefined) updated = await req.services.contactService.updateFirstName(id, firstName);
    if (lastName !== undefined)  updated = await req.services.contactService.updateLastName(id, lastName);
    if (phoneNumber !== undefined) updated = await req.services.contactService.updatePhoneNumber(id, phoneNumber);
    if (address !== undefined) updated = await req.services.contactService.updateAddress(id, address);
    res.json(updated.toJSON());
    } catch (err) {
    next(err);
  }
}

// Function to delete a contact
export async function deleteContact(req, res, next) {
  try {
    await req.services.contactService.deleteContact(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// Function to validate and search contacts by prefix for first name
export async function searchFirstNamePrefix(req, res, next) {
  try {
    const prefix = validatePrefix(req.query.prefix, 'First name prefix');
    const results = await req.services.contactService.searchFirstNamePrefix(prefix);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

// Function to validate and search contacts by prefix for last name
export async function searchLastNamePrefix(req, res, next) {
  try {
    const prefix = validatePrefix(req.query.prefix, 'Last name prefix');
    const results = await req.services.contactService.searchLastNamePrefix(prefix);
    res.json(results);
  } catch (err) {
    next(err);
  }
}

// Function to validate and search contacts by prefix for both first and last names 
export async function searchFullNamePrefix(req, res, next) {
  try {
    const first = validatePrefix(req.query.first, 'First name prefix');
    const last = validatePrefix(req.query.last, 'Last name prefix');
    const results = await req.services.contactService.searchFullNamePrefix(first, last);
    res.json(results);
  } catch (err) {
    next(err);
  }
}