// tests/appointment-service.test.js
import AppointmentService from '../services/appointment-service.js';

describe('AppointmentService', () => {
  let appointmentService;
  let appointment;

  // Initializes appointmentService and creates a test appointment before each test
  beforeEach(() => {
    appointmentService = new AppointmentService();
    // Create a date 1 day in the future
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    appointment = appointmentService.addAppointment({
      date: futureDate,
      description: 'Appointment Description'
    });
  });

  // Test for successfully adding a new appointment
  test('adds a new appointment', () => {
    expect(appointmentService.getAppointment(appointment.id)).toBeDefined();
  });

  // Test for throwing a duplicate ID error when trying to add an appointment with an ID that already exists
  test('throws error when adding duplicate appointment', () => {
    const duplicateAppointment = {
      id: appointment.id,
      date: appointment.date,
      description: appointment.description
    };

    expect(() => appointmentService.addAppointment(duplicateAppointment)).toThrow();
  });

  // Test for successfully deleting an appointment
  test('deletes an appointment', () => {
    appointmentService.deleteAppointment(appointment.id);
    expect(() => appointmentService.getAppointment(appointment.id)).toThrow();
  });

  // Test for throwing an error when trying to delete an appointment that is not found
  test('throws error when deleting an appointment that is not found', () => {
    expect(() => appointmentService.deleteAppointment('Appointment not found')).toThrow();
  });
});
