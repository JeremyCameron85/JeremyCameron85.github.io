// src/controllers/appointment.js
import AppointmentService from '../services/appointment-service.js';

const appointmentService = new AppointmentService();

// Function for creating a new appointment
export function createAppointment(req, res, next) {
  try {
    const appointment = appointmentService.addAppointment(req.body);
    res.status(201).json(appointment.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to retrieve all appointments
export function getAppointments(req, res, next) {
  try {
    const appointments = appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
}

// Function to retrieve an appointment by its ID
export function getAppointmentById(req, res, next) {
  try {
    const appointment = appointmentService.getAppointment(req.params.id);
    res.json(appointment.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to delete an appointment
export function deleteAppointment(req, res, next) {
  try {
    appointmentService.deleteAppointment(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}