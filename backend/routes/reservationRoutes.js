import { Router } from 'express';
import { createReservation, getHostReservations, getUserReservations, deleteReservation } from '../controllers/reservationController.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/', protect, createReservation);
router.get('/host', protect, getHostReservations);
router.get('/user', protect, getUserReservations);
router.delete('/:id', protect, deleteReservation);
export default router;
