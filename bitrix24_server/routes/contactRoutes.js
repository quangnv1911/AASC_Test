import express from 'express';
import { getAllContact, getContactById, createContact, updateContact, deleteContact } from '../controllers/contactcontroller.js';

const router = express.Router();

router.get('/', getAllContact);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/', updateContact);
router.delete('/', deleteContact);

export default router;