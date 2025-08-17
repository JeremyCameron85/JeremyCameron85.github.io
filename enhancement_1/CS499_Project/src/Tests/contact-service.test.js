// tests/contact-service.test.js
import ContactService from '../services/contact-service.js';

describe('ContactService', () => {
  let contactService;
  let contact;

  // Initializes contactService and creates a test contact before each test
  beforeEach(() => {
    contactService = new ContactService();
    contact = contactService.addContact({
      firstName: 'Jeremy',
      lastName: 'Cameron',
      phoneNumber: '1235157298',
      address: '1111 Your St'
    });
  });

  // Test for successfully adding a new contact
  test('adds a new contact', () => {
    expect(contactService.getContact(contact.id)).toBeDefined();
  });

  // Test for throwing a duplicate ID error when trying to add a new contact with an ID that already exists
  test('throws error when adding duplicate contact', () => {
  const duplicateContact = {
    id: contact.id,
    firstName: 'Jeremy',
    lastName: 'Cameron',
    phoneNumber: '1235157298',
    address: '1111 Your St'
  };

  expect(() => contactService.addContact(duplicateContact)).toThrow();
});

  // Test for successfully deleting a contact
  test('deletes a contact', () => {
    contactService.deleteContact(contact.id);
    expect(() => contactService.getContact(contact.id)).toThrow();
  });

  // Test for throwing an error when trying to delete a contact that is not found
  test('throws error when deleting a contact that is not found', () => {
    expect(() => contactService.deleteContact('Contact not found')).toThrow();
  });

  // Test for sucessfully updating a contact's first name
  test('updates first name', () => {
    contactService.updateFirstName(contact.id, 'Jamie');
    expect(contactService.getContact(contact.id).firstName).toBe('Jamie');
  });

  // Test for successfully updating a contact's last name
  test('updates last name', () => {
    contactService.updateLastName(contact.id, 'Welker');
    expect(contactService.getContact(contact.id).lastName).toBe('Welker');
  });

  // Test for successfully updating a contact's phone number
  test('updates phone number', () => {
    contactService.updatePhoneNumber(contact.id, '2226117828');
    expect(contactService.getContact(contact.id).phoneNumber).toBe('2226117828');
  });

  // Test for successfully updating a contact's address
  test('updates address', () => {
    contactService.updateAddress(contact.id, '2222 My Ave');
    expect(contactService.getContact(contact.id).address).toBe('2222 My Ave');
  });

  // Test for throwing an error when trying to update a contact that is not found
  test('throws error when updating a contact that is not found', () => {
    expect(() => contactService.updateFirstName('Contact not found', 'Jamie')).toThrow();
    expect(() => contactService.updateLastName('Contact not found', 'Welker')).toThrow();
    expect(() => contactService.updatePhoneNumber('Contact not found', '2226117828')).toThrow();
    expect(() => contactService.updateAddress('Contact not found', '2222 My Ave')).toThrow();
  });

  // Test for throwing an error when trying to update a contact with an invalid phone number
  test('throws error when updating with an invalid phone number', () => {
    expect(() => contactService.updatePhoneNumber(contact.id, '2226')).toThrow();
  });

  // Test for throwing an error when trying to update a contact with an invalid address
  test('throws error when updating with an invalid address', () => {
    expect(() => contactService.updateAddress(contact.id, '1111 My Ave, Apt G, city, state, zip code')).toThrow();
  });
});
