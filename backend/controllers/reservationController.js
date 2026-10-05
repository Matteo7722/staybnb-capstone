import Reservation from '../models/Reservation.js';
import Accommodation from '../models/Accommodation.js';

function nightsBetween(checkIn, checkOut) {
  return Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000);
}

export async function createReservation(req, res) {
  try {
    const { accommodationId, checkIn, checkOut, guests } = req.body;
    const listing = await Accommodation.findById(accommodationId);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    const guestCount = Number(guests);
    const nights = nightsBetween(checkIn, checkOut);
    if (!checkIn || !checkOut || nights <= 0) return res.status(400).json({ message: 'Please choose valid dates.' });
    if (guestCount < 1 || guestCount > listing.guests) return res.status(400).json({ message: `This home allows up to ${listing.guests} guests.` });
    const overlap = await Reservation.findOne({ accommodation: listing._id, checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } });
    if (overlap) return res.status(409).json({ message: 'Those dates are already reserved.' });
    const base = listing.price * nights;
    const discount = nights >= 7 ? base * (listing.weeklyDiscount / 100) : 0;
    const total = Math.max(0, base - discount) + listing.cleaningFee + listing.serviceFee + listing.occupancyTaxes;
    const reservation = await Reservation.create({ accommodation: listing._id, user: req.user._id, host: listing.host, checkIn, checkOut, guests: guestCount, total: Math.round(total) });
    res.status(201).json(await reservation.populate('accommodation', 'title location images'));
  } catch (error) { res.status(400).json({ message: error.message || 'Could not create reservation.' }); }
}

export async function getHostReservations(req, res) {
  try { res.json(await Reservation.find({ host: req.user._id }).populate('accommodation', 'title location').populate('user', 'username email').sort({ checkIn: 1 })); }
  catch (error) { res.status(500).json({ message: 'Could not load reservations.' }); }
}

export async function getUserReservations(req, res) {
  try { res.json(await Reservation.find({ user: req.user._id }).populate('accommodation', 'title location images').populate('host', 'username').sort({ checkIn: 1 })); }
  catch (error) { res.status(500).json({ message: 'Could not load reservations.' }); }
}

export async function deleteReservation(req, res) {
  try {
    const reservation = await Reservation.findOneAndDelete({ _id: req.params.id, $or: [{ user: req.user._id }, { host: req.user._id }] });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found.' });
    res.json({ message: 'Reservation deleted.' });
  } catch (error) { res.status(500).json({ message: 'Could not delete reservation.' }); }
}
