import Accommodation from '../models/Accommodation.js';

const cleanList = (value) => Array.isArray(value) ? value.filter(Boolean) : String(value || '').split(/[,\n]/).map(item => item.trim()).filter(Boolean);

export async function getAccommodations(req, res) {
  try {
    const filter = req.query.location ? { location: { $regex: req.query.location, $options: 'i' } } : {};
    const listings = await Accommodation.find(filter).populate('host', 'username email').sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) { res.status(500).json({ message: 'Could not load listings.', error: error.message }); }
}

export async function getAccommodation(req, res) {
  try {
    const listing = await Accommodation.findById(req.params.id).populate('host', 'username email');
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json(listing);
  } catch (error) { res.status(500).json({ message: 'Could not load this listing.', error: error.message }); }
}

export async function createAccommodation(req, res) {
  try {
    const body = req.body;
    const listing = await Accommodation.create({
      ...body,
      bedrooms: Number(body.bedrooms), bathrooms: Number(body.bathrooms), guests: Number(body.guests), price: Number(body.price),
      weeklyDiscount: Number(body.weeklyDiscount || 0), cleaningFee: Number(body.cleaningFee || 0), serviceFee: Number(body.serviceFee || 0), occupancyTaxes: Number(body.occupancyTaxes || 0),
      amenities: cleanList(body.amenities),
      images: req.files?.length ? req.files.map(file => `/uploads/${file.filename}`) : cleanList(body.images),
      host: req.user._id
    });
    res.status(201).json(listing);
  } catch (error) { res.status(400).json({ message: error.message || 'Could not create listing.' }); }
}

export async function updateAccommodation(req, res) {
  try {
    const listing = await Accommodation.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    const body = req.body;

    // Update normal text fields one at a time. This keeps fields such as
    // host and ratings from being overwritten by values from the form.
    ['title', 'location', 'description', 'type'].forEach(key => {
      if (body[key] !== undefined) listing[key] = body[key];
    });

    ['bedrooms', 'bathrooms', 'guests', 'price', 'weeklyDiscount', 'cleaningFee', 'serviceFee', 'occupancyTaxes'].forEach(key => {
      if (body[key] !== undefined) listing[key] = Number(body[key]);
    });

    if (body.amenities !== undefined) listing.amenities = cleanList(body.amenities);
    if (body.images !== undefined) listing.images = cleanList(body.images);
    if (req.files?.length) listing.images = req.files.map(file => `/uploads/${file.filename}`);
    await listing.save();
    res.json(listing);
  } catch (error) { res.status(400).json({ message: error.message || 'Could not update listing.' }); }
}

export async function deleteAccommodation(req, res) {
  try {
    const listing = await Accommodation.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found.' });
    res.json({ message: 'Listing deleted.' });
  } catch (error) { res.status(500).json({ message: 'Could not delete listing.', error: error.message }); }
}
