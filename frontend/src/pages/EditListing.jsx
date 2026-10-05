import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../api.js';
import ListingForm from './ListingForm.jsx';
export default function EditListing(){const {id}=useParams();const [listing,setListing]=useState(null);const [error,setError]=useState('');useEffect(()=>{apiRequest(`/accommodations/${id}`).then(setListing).catch(e=>setError(e.message));},[id]);if(error)return <main className="page"><div className="error-box">{error}</div></main>;if(!listing)return <main className="page"><p>Loading...</p></main>;return <main className="page admin-form"><p className="eyebrow">ADMIN · EDIT</p><h1>Update Listing</h1><p className="muted">Edit the existing property information.</p><ListingForm initial={listing} editId={id}/></main>}
