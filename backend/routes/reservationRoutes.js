
import { Router } from 'express';
import {
  createReservation,
  getHostReservations,
  getUserReservations,
  deleteReservation
} from '../controllers/reservationController.js';

import { protect, hostOnly } from '../middleware/auth.js';

const router = Router();

// Create a reservation (logged-in users)
router.post('/', protect, createReservation);

// View host reservations (hosts only)
router.get('/host', protect, hostOnly, getHostReservations);

// View your own reservations
router.get('/user', protect, getUserReservations);

// Delete a reservation (owner or host, checked in controller)
router.delete('/:id', protect, deleteReservation);

export default router;
