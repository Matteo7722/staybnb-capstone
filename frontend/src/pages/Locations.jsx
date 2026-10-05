import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { apiRequest } from '../api.js';
import ListingCard from '../components/ListingCard.jsx';
import Footer from '../components/Footer.jsx';

export default function Locations() {
  const [params] = useSearchParams();

  const startingLocation = params.get('location') || '';

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(startingLocation);
  const [entireHome, setEntireHome] = useState(false);
  const [privateRoom, setPrivateRoom] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setLoading(true);

    apiRequest('/accommodations')
      .then((data) => setListings(data))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredListings = listings.filter((listing) => {
    // location filter
    const matchesLocation =
      !location ||
      listing.location
        ?.toLowerCase()
        .includes(location.toLowerCase());

    // type filter
    let matchesType = true;

    if (entireHome || privateRoom) {
      const type = listing.type?.toLowerCase() || '';

      matchesType =
        (entireHome &&
          (type.includes('entire') ||
            type.includes('apartment') ||
            type.includes('home'))) ||
        (privateRoom && type.includes('private'));
    }

    // price filter
    const price = Number(listing.price);

    const matchesMin =
      minPrice === '' || price >= Number(minPrice);

    const matchesMax =
      maxPrice === '' || price <= Number(maxPrice);

    return (
      matchesLocation &&
      matchesType &&
      matchesMin &&
      matchesMax
    );
  });

  return (
    <>
      <main className="page">

        <div className="location-top">
          <div>
            <p className="muted">Stays in</p>

            <h1>
              {location || 'All destinations'}
            </h1>

            <p>
              {filteredListings.length} accommodations
            </p>
          </div>

          <button className="filter-btn">
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </div>

        <div className="results-layout">

          <aside>

            <h3>Location</h3>

            <input
              value={location}
              placeholder="Search location"
              onChange={(e) => setLocation(e.target.value)}
            />

            <h3>Type of place</h3>

            <label>
              <input
                type="checkbox"
                checked={entireHome}
                onChange={(e) =>
                  setEntireHome(e.target.checked)
                }
              />
              Entire home
            </label>

            <label>
              <input
                type="checkbox"
                checked={privateRoom}
                onChange={(e) =>
                  setPrivateRoom(e.target.checked)
                }
              />
              Private room
            </label>

            <h3>Price range</h3>

            <div className="price-row">

              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
              />

            </div>

          </aside>

          <section className="results">

            {loading ? (
              <p>Loading stays...</p>
            ) : filteredListings.length ? (

              filteredListings.map((listing) => (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                />
              ))

            ) : (

              <div className="empty">
                <h2>No stays found</h2>
                <p>Try changing your filters.</p>
              </div>

            )}

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}