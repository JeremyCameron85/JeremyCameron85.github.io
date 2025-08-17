// tests/contact.test.js
import Contact from '../domain/contact.js';

describe('Contact', () => {

  // Test for successfully creating a new contact
  test('creates contact with valid parameters', () => {
    const contact = new Contact({
      firstName: 'Jeremy',
      lastName: 'Cameron',
      phoneNumber: '1235157298',
      address: '1111 Your St'
    });

    expect(contact.id).toBeDefined();
    expect(contact.id.length).toBeLessThanOrEqual(10);
    expect(contact.firstName).toBe('Jeremy');
    expect(contact.lastName).toBe('Cameron');
    expect(contact.phoneNumber).toBe('1235157298');
    expect(contact.address).toBe('1111 Your St');
  });

  // Test for throwing an error when the first name is too long
  test('throws error for invalid first name (too long)', () => {
    expect(() => {
      new Contact({
        firstName: 'JeremyJeremyJeremy',
        lastName: 'Cameron',
        phoneNumber: '1235157298',
        address: '1111 Your St'
      });
    }).toThrow();
  });

  // Test for throwing an error when the last name is too long
  test('throws error for invalid last name (too long)', () => {
    expect(() => {
      new Contact({
        firstName: 'Jeremy',
        lastName: 'CameronCameronCameron',
        phoneNumber: '1235157298',
        address: '1111 Your St'
      });
    }).toThrow();
  });

  // Test for throwing an error when the phone number is invalid
  test('throws error for invalid phone number (not exactly 10 digits or contains letters)', () => {
    expect(() => {
      new Contact({
        firstName: 'Jeremy',
        lastName: 'Cameron',
        phoneNumber: '123515729',
        address: '1111 Your St'
      });
    }).toThrow();

    expect(() => {
      new Contact({
        firstName: 'Jeremy',
        lastName: 'Cameron',
        phoneNumber: '12351572982',
        address: '1111 Your St'
      });
    }).toThrow();

    expect(() => {
      new Contact({
        firstName: 'Jeremy',
        lastName: 'Cameron',
        phoneNumber: '1235157298C',
        address: '1111 Your St'
      });
    }).toThrow();
  });

  // Test for throwing an error when the address is too long
  test('throws error for invalid address (too long)', () => {
    expect(() => {
      new Contact({
        firstName: 'Jeremy',
        lastName: 'Cameron',
        phoneNumber: '1235157298',
        address: '1111 Your St, Apt E, city, state, zip code'
      });
    }).toThrow();
  });

  // Test for successfully updating a contact's first name and throwing an error if the input is too long
  test('setFirstName updates name and throws on invalid input', () => {
    const contact = new Contact({
      firstName: 'Jeremy',
      lastName: 'Cameron',
      phoneNumber: '1235157298',
      address: '1111 Your St'
    });
    contact.setFirstName('Jamie');
    expect(contact.firstName).toBe('Jamie');

    expect(() => contact.setFirstName(null)).toThrow();
    expect(() => contact.setFirstName('JamieCameronJamieCameron')).toThrow();
  });

  // Test for successfully updating a contact's last name and throwing an error if the input is too long
  test('setLastName updates name and throws on invalid input', () => {
    const contact = new Contact({
      firstName: 'Jeremy',
      lastName: 'Cameron',
      phoneNumber: '1235157298',
      address: '1111 Your St'
    });
    contact.setLastName('Welker');
    expect(contact.lastName).toBe('Welker');

    expect(() => contact.setLastName(null)).toThrow();
    expect(() => contact.setLastName('WelkerWelkerWelker')).toThrow();
  });

  // Test for successfully updating a contact's phone number and throwing an error if the input is too long or contains letters
  test('setPhoneNumber updates number and throws on invalid input', () => {
    const contact = new Contact({
      firstName: 'Jeremy',
      lastName: 'Cameron',
      phoneNumber: '1235157298',
      address: '1111 Your St'
    });
    contact.setPhoneNumber('2226117828');
    expect(contact.phoneNumber).toBe('2226117828');

    expect(() => contact.setPhoneNumber(null)).toThrow();
    expect(() => contact.setPhoneNumber('123515729')).toThrow();
    expect(() => contact.setPhoneNumber('22261178288')).toThrow();
    expect(() => contact.setPhoneNumber('kekuwurofl')).toThrow();
  });

  // Test for successfully updating a contact's address and throwing an error if the input is too long
  test('setAddress updates address and throws on invalid input', () => {
    const contact = new Contact({
      firstName: 'Jeremy',
      lastName: 'Cameron',
      phoneNumber: '1235157298',
      address: '1111 Your St'
    });
    contact.setAddress('2222 My Ave');
    expect(contact.address).toBe('2222 My Ave');

    expect(() => contact.setAddress(null)).toThrow();
    expect(() => contact.setAddress('1111 My Ave, Apt G, city, state, zip code')).toThrow();
  });
});
