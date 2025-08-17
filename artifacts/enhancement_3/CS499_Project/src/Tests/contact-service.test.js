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

  // Test for searching by prefix for both first and last names
  test('searches first and last names by prefix', () => {
    expect(contactService.getContact(contact.id)).toBeDefined();

    const resultsFirstName = contactService.searchFirstNamePrefix('Je');
    expect(resultsFirstName).toHaveLength(1);
    expect(resultsFirstName[0].id).toBe(contact.id);

    const resultsLastName = contactService.searchLastNamePrefix('Ca');
    expect(resultsLastName).toHaveLength(1);
    expect(resultsLastName[0].id).toBe(contact.id);

    const resultsNone = contactService.searchFirstNamePrefix('Xx');
    expect(resultsNone).toHaveLength(0);
  });

  // Test for deleting a contact's first and last name
  test('deletes name', () => {
    contactService.deleteContact(contact.id);
    expect(contactService.searchFirstNamePrefix('Je')).toHaveLength(0);
    expect(contactService.searchLastNamePrefix('Ca')).toHaveLength(0);
    expect(() => contactService.getContact(contact.id)).toThrow();
  });

  // Test for updating a contact's first name and searching by prefix
  test('updates first name', () => {
    contactService.updateFirstName(contact.id, 'Jamie');
    expect(contactService.searchFirstNamePrefix('Je')).toHaveLength(0);

    const results = contactService.searchFirstNamePrefix('Ja');
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(contact.id);
  });

  // Test for updating a contact's last name and searching by prefix
  test('updates last name', () => {
    contactService.updateLastName(contact.id, 'Welker');
    expect(contactService.searchLastNamePrefix('Ca')).toHaveLength(0);

    const results = contactService.searchLastNamePrefix('We');
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(contact.id);
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
