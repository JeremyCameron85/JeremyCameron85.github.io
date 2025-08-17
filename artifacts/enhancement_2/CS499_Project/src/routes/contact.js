// src/routes/contact.js
import { Router } from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  searchFirstNamePrefix,
  searchLastNamePrefix,
  searchFullNamePrefix,
  updateContact,
  deleteContact
} from '../controllers/contact.js';

const router = Router();

router.get('/', getContacts);
router.get('/search/first-name', searchFirstNamePrefix);
router.get('/search/last-name', searchLastNamePrefix);
router.get('/search/full-name', searchFullNamePrefix);
router.get('/:id', getContactById);
router.post('/', createContact);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);


export default router;