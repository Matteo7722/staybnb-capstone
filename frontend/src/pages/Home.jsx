import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Footer from '../components/Footer.jsx';

const tripCards = [
  [
    'Cape Town',
    'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=700&q=80'
  ],
  [
    'New York',
    'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=700&q=80'
  ],
  [
    'Barcelona',
    'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=700&q=80'
  ],
  [
    'Paris',
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80'
  ]
];

const getawayPlaces = {
  Popular: [
    ['Canmore', 'Canada'],
    ['Benalmádena', 'Spain'],
    ['Marbella', 'Spain'],
    ['Mijas', 'Spain'],
    ['Prescott', 'United States'],
    ['Scottsdale', 'United States']
  ],

  'Arts & culture': [
    ['Florence', 'Italy'],
    ['Rome', 'Italy'],
    ['Paris', 'France'],
    ['Barcelona', 'Spain'],
    ['Vienna', 'Austria'],
    ['Amsterdam', 'Netherlands']
  ],

  Outdoors: [
    ['Banff', 'Canada'],
    ['Yosemite', 'United States'],
    ['Interlaken', 'Switzerland'],
    ['Queenstown', 'New Zealand'],
    ['Cape Town', 'South Africa'],
    ['Reykjavik', 'Iceland']
  ],

  Mountains: [
    ['Aspen', 'United States'],
    ['Zermatt', 'Switzerland'],
    ['Chamonix', 'France'],
    ['Whistler', 'Canada'],
    ['Innsbruck', 'Austria'],
    ['Hakuba', 'Japan']
  ],

  Beach: [
    ['Malibu', 'United States'],
    ['Cancún', 'Mexico'],
    ['Bali', 'Indonesia'],
    ['Santorini', 'Greece'],
    ['Durban', 'South Africa'],
    ['Phuket', 'Thailand']
  ]
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('Popular');

  return (
    <div>

      {/* Hero section */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">NOT SURE WHERE TO GO?</p>

          <h1>
            Find a place
            <br />
            that feels like home.
          </h1>

          <p>
            Discover stays, experiences and unforgettable trips around the world.
          </p>

          <Link to="/locations" className="primary-btn">
            Explore stays
          </Link>
        </div>
      </section>


      {/* Trip inspiration */}
      <section className="section">
        <h2>Inspiration for your next trip</h2>

        <div className="trip-grid">
          {tripCards.map(([name, img]) => (
            <Link
              className="trip-card"
              to={`/locations?location=${name}`}
              key={name}
            >
              <img src={img} alt={name} />

              <div>
                <h3>{name}</h3>
                <p>Explore stays in {name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Experiences */}
      <section className="section">
        <h2>Discover Airbnb Experiences</h2>

        <div className="experience-grid">

          <div className="experience experience-one">
            <h2>
              Things to do
              <br />
              on your trip
            </h2>

            <Link to="/locations" className="light-btn">
              Explore experiences
            </Link>
          </div>

          <div className="experience experience-two">
            <h2>
              Things to do
              <br />
              at home
            </h2>

            <button className="light-btn">
              Discover online experiences
            </button>
          </div>

        </div>
      </section>


      {/* Gift cards */}
      <section className="shop section">

        <div>
          <p className="eyebrow">SHOPAIRBNB</p>

          <h2>
            Give the gift
            <br />
            of getting away.
          </h2>

          <button className="primary-btn">
            Shop gift cards
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80"
          alt="Gift cards"
        />

      </section>


      {/* Future getaways */}
      <section className="section">

        <h2>Inspiration for future getaways</h2>

        <div className="tabs">

          {Object.keys(getawayPlaces).map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}

        </div>

        <div className="destination-list">

          {getawayPlaces[activeTab].map(([city, country]) => (
            <div key={city}>
              <b>{city}</b>
              <span>{country}</span>
            </div>
          ))}

        </div>

      </section>


      <Footer />

    </div>
  );
}