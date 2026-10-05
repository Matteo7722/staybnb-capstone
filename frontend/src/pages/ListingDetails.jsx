import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Footer from '../components/Footer.jsx';

export default function ListingDetails() {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [error, setError] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest(`/accommodations/${id}`)
      .then(setListing)
      .catch(e => setError(e.message));
  }, [id]);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    return Math.max(
      0,
      Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) / 86400000
      )
    );
  }, [checkIn, checkOut]);

  if (error) {
    return (
      <main className="page">
        <div className="empty">
          <h2>{error}</h2>
        </div>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="page">
        <p>Loading listing...</p>
      </main>
    );
  }

  const base = listing.price * nights;

  const discount =
    nights >= 7
      ? base * (listing.weeklyDiscount / 100)
      : 0;

  const total =
    Math.max(0, base - discount) +
    listing.cleaningFee +
    listing.serviceFee +
    listing.occupancyTaxes;

  async function reserve() {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await apiRequest('/reservations', {
        method: 'POST',
        body: JSON.stringify({
          accommodationId: id,
          checkIn,
          checkOut,
          guests
        })
      });

      alert('Reservation created successfully.');
      navigate('/reservations');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <main className="details page">

        <div className="details-heading">
          <div>
            <p className="muted">
              {listing.type} in {listing.location}
            </p>

            <h1>{listing.title}</h1>

            <p>
              ★ {listing.rating} · {listing.reviews} reviews · {listing.location}
            </p>
          </div>
        </div>

        <div className="gallery">
          {listing.images?.slice(0, 5).map((img, i) => (
            <img
              className={i === 0 ? 'gallery-main' : ''}
              key={i}
              src={img}
              alt={`${listing.title} ${i + 1}`}
            />
          ))}
        </div>

        <div className="details-columns">

          <section className="details-left">

            <div className="host-line">
              <div className="avatar">
                {listing.host?.username?.[0] || 'H'}
              </div>

              <div>
                <h3>
                  {listing.type} hosted by{' '}
                  {listing.host?.username || 'Host'}
                </h3>

                <p>
                  {listing.guests} guests · {listing.bedrooms} bedrooms ·{' '}
                  {listing.bathrooms} bathrooms
                </p>
              </div>
            </div>

            <hr />

            <h2>About this place</h2>

            <p className="description">
              {listing.description}
            </p>

            <hr />

            <h2>Where you'll sleep</h2>

            <div className="sleep-card">
              <b>Bedroom</b>
              <span>🛏 {listing.bedrooms} beds</span>
            </div>

            <hr />

            <h2>What this place offers</h2>

            <div className="amenities">
              {listing.amenities.map(a => (
                <span key={a}>✓ {a}</span>
              ))}
            </div>

            <hr />

            <h2>Reviews</h2>

            <div className="rating-grid">
              {Object.entries(listing.specificRatings || {}).map(
                ([key, val]) => (
                  <div key={key}>
                    <span>{key}</span>
                    <b>{val}</b>

                    <div className="rating-bar">
                      <i
                        style={{
                          width: `${val * 20}%`
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            <hr />

            <h2>Host Details</h2>

            <p>
              Hosted by {listing.host?.username || 'your host'}.
              Guests can expect a clean, comfortable stay and clear
              communication.
            </p>

            <hr />

            <h2>
              House Rules, Health & Safety, Cancellation Policy
            </h2>

            <p>
              Check-in after 15:00 · Checkout before 11:00 ·
              No smoking · No parties.
            </p>

            <p>
              Enhanced cleaning:{' '}
              {listing.enhancedCleaning ? 'Yes' : 'No'} ·
              Self check-in: {listing.selfCheckIn ? 'Yes' : 'No'}
            </p>

          </section>

          <aside className="booking-card">

            <div className="booking-price">
              <b>${listing.price}</b> night
            </div>

            <div className="date-fields">

              <label>
                CHECK-IN
                <input
                  type="date"
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                />
              </label>

              <label>
                CHECK-OUT
                <input
                  type="date"
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                />
              </label>

            </div>

            <label className="guest-field">
              GUESTS

              <select
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
              >
                {Array.from(
                  { length: listing.guests },
                  (_, i) => (
                    <option key={i + 1}>
                      {i + 1}
                    </option>
                  )
                )}
              </select>
            </label>

            <button
              className="primary-btn full"
              onClick={reserve}
            >
              Reserve
            </button>

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            <div className="cost-lines">

              <span>
                ${listing.price} × {nights} nights
                <b>${base}</b>
              </span>

              {discount > 0 && (
                <span>
                  Weekly discount
                  <b>-${discount.toFixed(0)}</b>
                </span>
              )}

              <span>
                Cleaning fee
                <b>${listing.cleaningFee}</b>
              </span>

              <span>
                Service fee
                <b>${listing.serviceFee}</b>
              </span>

              <span>
                Occupancy taxes and fees
                <b>${listing.occupancyTaxes}</b>
              </span>

              <hr />

              <span>
                <strong>Total before taxes</strong>
                <b>${total.toFixed(0)}</b>
              </span>

            </div>

            <p className="muted center">
              You won't be charged yet
            </p>

          </aside>
        </div>


      </main>

      <Footer />
    </>
  );
}