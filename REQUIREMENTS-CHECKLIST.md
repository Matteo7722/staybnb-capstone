# Assignment checklist

This project is organised around every requirement in the supplied brief.

## Admin dashboard
- Top header: logo, navigation/search, logged-in greeting, profile dropdown, reservations, logout, logged-out Become a host.
- Login: email/password validation, error feedback, JWT session, protected dashboard.
- Create listing: title, location, description, bedrooms, bathrooms, guests, type, price, amenities, images, weekly discount, cleaning fee, service fee, occupancy taxes, validation and optional image upload.
- View listings: title, location, price, main image, update and delete.
- Update listing: existing data pre-filled and saved.
- Navigation: React Router URLs for each view.
- Error handling and feedback throughout.
- Modular controllers, models, routes and reusable frontend components.

## Frontend clone
- Home page: hero, inspiration cards, Experiences, things to do, ShopAirbnb, future getaway tabs/list, static footer and copyright footer.
- Location page: location filter, accommodation cards, image/details layout, heading and count.
- Listing details: accommodation heading/subheading, rating/location, five-image gallery, details + calculator columns, dates/guests, weekly discount, cleaning/service/tax fees, reservation, accommodation details, sleeping area, amenities, reviews, host, rules/safety/cancellation, footer.
- Header: logo, location search/filter, profile/login/reservations.

## Backend
- Node.js, Express, MongoDB/Mongoose and JWT.
- Accommodation POST/GET/DELETE plus PUT for the required update screen.
- User login.
- Reservation POST, host GET, user GET and DELETE.
- JWT middleware and host authorization.
- Mongoose models for User, Accommodation and Reservation.
- Multer image upload support.
