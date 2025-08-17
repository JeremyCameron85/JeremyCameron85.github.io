// src/routes/appointment.js
import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment
} from '../controllers/appointment.js';

const router = Router();

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.delete('/:id', deleteAppointment);

export default router;