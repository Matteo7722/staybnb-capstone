import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  bedrooms: { type: Number, required: true, min: 1 },
  bathrooms: { type: Number, required: true, min: 1 },
  guests: { type: Number, required: true, min: 1 },
  type: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  amenities: [{ type: String }],
  images: [{ type: String }],
  weeklyDiscount: { type: Number, default: 0, min: 0 },
  cleaningFee: { type: Number, default: 0, min: 0 },
  serviceFee: { type: Number, default: 0, min: 0 },
  occupancyTaxes: { type: Number, default: 0, min: 0 },
  enhancedCleaning: { type: Boolean, default: true },
  selfCheckIn: { type: Boolean, default: true },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviews: { type: Number, default: 0, min: 0 },
  specificRatings: {
    cleanliness: { type: Number, default: 4.8 },
    communication: { type: Number, default: 4.7 },
    checkIn: { type: Number, default: 4.9 },
    accuracy: { type: Number, default: 4.6 },
    location: { type: Number, default: 4.9 },
    value: { type: Number, default: 4.5 }
  },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Accommodation', accommodationSchema);
