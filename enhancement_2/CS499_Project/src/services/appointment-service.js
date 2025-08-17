// src/services/appointment-service.js
import Appointment from '../domain/appointment.js';
import DuplicateIdError from '../errors/error-duplicate-id.js';
import { ensureIdExists } from '../utils/validators.js';

export default class AppointmentService {
  // Creates a new private Map to store appointments by ID
  #appointments = new Map();

  // Method to add a new appointment
  addAppointment(data) {
    // If ID is provided, checks if it already exists.
    const idToCheck = data.id ?? null;
    if (idToCheck && this.#appointments.has(idToCheck)) {
      throw new DuplicateIdError(`Appointment ID already exists: ${idToCheck}`);
    }
    
    // Creates a new appointment and checks if the generated ID already exists
    const appointment = new Appointment(data);
    if (this.#appointments.has(appointment.id)) {
      throw new DuplicateIdError(`Appointment ID already exists: ${appointment.id}`);
    }
    // Stores the new appointment in the Map and returns it
    this.#appointments.set(appointment.id, appointment);
    return appointment;
  }

  // Method to delete an appointment
  deleteAppointment(id) {
    // Verifies the ID exists before trying to delete
    ensureIdExists(this.#appointments, id, 'Appointment');
    this.#appointments.delete(id);
  }

  // Method to retrieve an appointment
  getAppointment(id) {
    // Verifies the ID exists before trying to retrieve
    ensureIdExists(this.#appointments, id, 'Appointment');
    return this.#appointments.get(id);
  }

  // Method to retrieve all appointments as an array of JSON objects
  getAllAppointments() {
    return Array.from(this.#appointments.values()).map(c => c.toJSON());
  }
}