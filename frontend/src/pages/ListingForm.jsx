import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api.js';

const blank = {
  title: '',
  location: '',
  description: '',
  bedrooms: 1,
  bathrooms: 1,
  guests: 1,
  type: 'Entire apartment',
  price: '',
  amenities: 'wifi, kitchen',
  images: '',
  weeklyDiscount: 0,
  cleaningFee: 0,
  serviceFee: 0,
  occupancyTaxes: 0
};

export default function ListingForm({ initial, editId }) {
  const [form, setForm] = useState(blank);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initial) return;

    // Only copy fields that can actually be edited in this form.
    // The API also returns things like host and ratings, but those
    // should not be sent back when an admin updates a listing.
    setForm({
      title: initial.title || '',
      location: initial.location || '',
      description: initial.description || '',
      bedrooms: initial.bedrooms || 1,
      bathrooms: initial.bathrooms || 1,
      guests: initial.guests || 1,
      type: initial.type || 'Entire apartment',
      price: initial.price || '',
      amenities: initial.amenities?.join(', ') || '',
      images: initial.images?.join('\n') || '',
      weeklyDiscount: initial.weeklyDiscount || 0,
      cleaningFee: initial.cleaningFee || 0,
      serviceFee: initial.serviceFee || 0,
      occupancyTaxes: initial.occupancyTaxes || 0
    });
  }, [initial]);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.location.trim() || !form.description.trim()) {
      return setError('Title, location and description are required.');
    }
    if (Number(form.price) <= 0) return setError('Price must be greater than zero.');
    if (Number(form.guests) < 1 || Number(form.bedrooms) < 1 || Number(form.bathrooms) < 1) {
      return setError('Guests, bedrooms and bathrooms must be at least 1.');
    }

    setSaving(true);

    try {
      const body = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        body.append(key, value);
      });

      files.forEach(file => body.append('images', file));

      await apiRequest(editId ? `/accommodations/${editId}` : '/accommodations', {
        method: editId ? 'PUT' : 'POST',
        body
      });

      navigate('/admin/listings');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="listing-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Title<input name="title" value={form.title} onChange={change} placeholder="Modern apartment in New York" /></label>
        <label>Location<input name="location" value={form.location} onChange={change} placeholder="New York" /></label>
        <label>Accommodation type<select name="type" value={form.type} onChange={change}><option>Entire apartment</option><option>Entire home</option><option>Private room</option><option>Guest suite</option></select></label>
        <label>Price per night<input type="number" name="price" value={form.price} onChange={change} min="0" /></label>
        <label>Bedrooms<input type="number" name="bedrooms" value={form.bedrooms} onChange={change} min="1" /></label>
        <label>Bathrooms<input type="number" name="bathrooms" value={form.bathrooms} onChange={change} min="1" /></label>
        <label>Guests<input type="number" name="guests" value={form.guests} onChange={change} min="1" /></label>
        <label>Weekly discount (%)<input type="number" name="weeklyDiscount" value={form.weeklyDiscount} onChange={change} min="0" /></label>
        <label>Cleaning fee<input type="number" name="cleaningFee" value={form.cleaningFee} onChange={change} min="0" /></label>
        <label>Service fee<input type="number" name="serviceFee" value={form.serviceFee} onChange={change} min="0" /></label>
        <label>Occupancy taxes<input type="number" name="occupancyTaxes" value={form.occupancyTaxes} onChange={change} min="0" /></label>
      </div>

      <label>Description<textarea name="description" value={form.description} onChange={change} rows="6" placeholder="Tell guests what makes this place special." /></label>
      <label>Amenities <span className="muted">(comma separated)</span><input name="amenities" value={form.amenities} onChange={change} placeholder="wifi, kitchen, free parking" /></label>
      <label>Image URLs <span className="muted">(one per line)</span><textarea name="images" value={form.images} onChange={change} rows="4" placeholder="https://..." /></label>
      <label>Upload images <span className="muted">(optional)</span><input type="file" accept="image/*" multiple onChange={e => setFiles(Array.from(e.target.files))} /></label>

      {error && <div className="error-box">{error}</div>}
      <button className="primary-btn" disabled={saving}>{saving ? 'Saving...' : editId ? 'Save changes' : 'Create listing'}</button>
    </form>
  );
}
