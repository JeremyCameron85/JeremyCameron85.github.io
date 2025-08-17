// src/services/init-services.js
import ContactService from './contact-service.js';
import TaskService from './task-service.js';
import AppointmentService from './appointment-service.js';

// Helper function for initializing services
export async function initServices() {
    const contactService = await ContactService.create();
    const taskService = await TaskService.create();
    const appointmentService = await AppointmentService.create();
    return { contactService, taskService, appointmentService };
}