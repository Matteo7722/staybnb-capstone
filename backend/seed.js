import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Accommodation from './models/Accommodation.js';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
await User.deleteMany({});
await Accommodation.deleteMany({});
const password = await bcrypt.hash('password123', 10);
const [admin, user] = await User.create([
  { username: 'Admin Host', email: 'admin@staybnb.com', password, role: 'host' },
  { username: 'Jane Doe', email: 'jane@example.com', password, role: 'user' }
]);
await Accommodation.insertMany([
  { title:'Modern Apartment in New York', location:'New York', description:'Stay in the heart of New York City in a bright, comfortable apartment close to the city\'s best attractions.', bedrooms:2, bathrooms:2, guests:4, type:'Entire apartment', price:320, amenities:['wifi','kitchen','free parking','air conditioning'], images:['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80'], weeklyDiscount:0, cleaningFee:50, serviceFee:50, occupancyTaxes:30, enhancedCleaning:true, selfCheckIn:true, rating:4.5, reviews:320, host:admin },
  { title:'Cozy Cape Town Getaway', location:'Cape Town', description:'A relaxed city stay with mountain views, a full kitchen and easy access to the best of Cape Town.', bedrooms:2, bathrooms:1, guests:4, type:'Entire home', price:180, amenities:['wifi','kitchen','pool','workspace'], images:['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80'], weeklyDiscount:10, cleaningFee:35, serviceFee:30, occupancyTaxes:20, enhancedCleaning:true, selfCheckIn:true, rating:4.8, reviews:184, host:admin },
  { title:'Beach House in Barcelona', location:'Barcelona', description:'Walk to the beach from this stylish home with a sunny terrace and plenty of space for a group.', bedrooms:3, bathrooms:2, guests:6, type:'Entire home', price:245, amenities:['wifi','kitchen','washer','patio'], images:['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80'], weeklyDiscount:12, cleaningFee:45, serviceFee:45, occupancyTaxes:25, enhancedCleaning:true, selfCheckIn:true, rating:4.7, reviews:221, host:admin }
]);
console.log('Seed complete.');
await mongoose.disconnect();
