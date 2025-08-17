// src/controllers/contact.js
import ContactService from '../services/contact-service.js';

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

    let updated;
    if (firstName !== undefined) updated = contactService.updateFirstName(id, firstName);
    if (lastName !== undefined)  updated = contactService.updateLastName(id, lastName);
    if (phoneNumber !== undefined) updated = contactService.updatePhoneNumber(id, phoneNumber);
    if (address !== undefined) updated = contactService.updateAddress(id, address);

    // If no fields are provided, returns the current contact unchanged.
    if (!updated) {
      updated = contactService.getContact(id);
    }
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