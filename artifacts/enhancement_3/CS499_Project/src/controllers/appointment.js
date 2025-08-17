// src/controllers/appointment.js

// Function for creating a new appointment
export async function createAppointment(req, res, next) {
  try {
    const appointment = await req.services.appointmentService.addAppointment(req.body);
    res.status(201).json(appointment.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to retrieve all appointments
export async function getAppointments(req, res, next) {
  try {
    const appointments = await req.services.appointmentService.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
}

// Function to retrieve an appointment by its ID
export async function getAppointmentById(req, res, next) {
  try {
    const appointment = await req.services.appointmentService.getAppointment(req.params.id);
    res.json(appointment.toJSON());
  } catch (err) {
    next(err);
  }
}

// Function to delete an appointment
export async function deleteAppointment(req, res, next) {
  try {
    await req.services.appointmentService.deleteAppointment(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}