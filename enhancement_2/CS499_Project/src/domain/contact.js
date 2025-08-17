// src/domain/contact.js
import { generateUniqueId } from '../utils/unique-id-generator.js';
import ValidationError from '../errors/error-validation.js';
import { maxLength, exactDigits, notBlank } from '../utils/validators.js';

export default class Contact {
  #id;
  #firstName;
  #lastName;
  #phoneNumber;
  #address;

  // Constructor to create a new Contact object with parameters (unique ID, first and last name, phone number, and address)
  constructor({ id = generateUniqueId(), firstName, lastName, phoneNumber, address }) {
    this.#id = id;
    this.setFirstName(firstName);
    this.setLastName(lastName);
    this.setPhoneNumber(phoneNumber);
    this.setAddress(address);
  }

  // Block of getters
  get id() {
    return this.#id;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get phoneNumber() {
    return this.#phoneNumber;
  }

  get address() {
    return this.#address;
  }

  // Block of setters with validation
  setFirstName(firstName) {
    try {
      this.#firstName = maxLength(notBlank(firstName, 'First name'), 10, 'First name');
    } catch (e) {
      throw new ValidationError(e.message);
    }
  }

  setLastName(lastName) {
    try {
      this.#lastName = maxLength(notBlank(lastName, 'Last name'), 10, 'Last name');
    } catch (e) {
      throw new ValidationError(e.message);
    }
  }

  setPhoneNumber(phoneNumber) {
    try {
      this.#phoneNumber = exactDigits(notBlank(phoneNumber, 'Phone number'), 10, 'Phone number');
    } catch (e) {
      throw new ValidationError(e.message);
    }
  }

  setAddress(address) {
    try {
      this.#address = maxLength(notBlank(address, 'Address'), 30, 'Address');
    } catch (e) {
      throw new ValidationError(e.message);
    }
  }

  toJSON() {
    return {
      id: this.#id,
      firstName: this.#firstName,
      lastName: this.#lastName,
      phoneNumber: this.#phoneNumber,
      address: this.#address
    };
  }
}