// tests/appointment.test.js
import Appointment from '../domain/appointment.js';

describe('Appointment', () => {
  let appointment;
  let futureDate;

  // Initializes a future date and creates a test appointment before each test
  beforeEach(() => {
    // Create a Date one day in the future
    futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    futureDate.setMilliseconds(0); // To align with Java's millisecond handling
    appointment = new Appointment({ date: futureDate, description: 'Appointment Description' });
  });

  // Test for successfully creating a new appointment
  test('creates appointment with valid parameters', () => {
    const id = appointment.id;
    const actualDate = appointment.date;

    expect(id).toBeDefined();
    expect(id.length).toBe(10);

    const now = new Date();
    const diff = Math.abs(actualDate.getTime() - futureDate.getTime());
    expect(diff).toBeLessThan(1000);

    expect(appointment.description).toBe('Appointment Description');
  });

  // Test for throwing an error when the date is in the past
  test('throws error when created with past date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    expect(() => new Appointment({ date: pastDate, description: 'Appointment Description' })).toThrow();
  });

  // Test for throwing an error when the date is set to the current date and time
  test('throws error when created with current date', () => {
    const currentDate = new Date();
    currentDate.setMilliseconds(0);

    expect(() => new Appointment({ date: currentDate, description: 'Appointment Description' })).toThrow();
  });

  // Test for throwing an error when the description is too long
  test('throws error for description longer than 50 characters', () => {
    expect(() => {
      new Appointment({
        date: futureDate,
        description: 'Test Appointment Description More Than 50 Characters Block Block'
      });
    }).toThrow();
  });

  // Test for successfully updating the description to the maximum allowed length
  test('updates description with max length (50)', () => {
    const newDescription = 'fiftycharacterstest505050fiftycharacterstest505050';
    appointment.setDescription(newDescription);
    expect(appointment.description).toBe(newDescription);
  });
});
