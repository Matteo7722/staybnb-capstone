import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Locations from './pages/Locations.jsx';
import ListingDetails from './pages/ListingDetails.jsx';
import Login from './pages/Login.jsx';
import Reservations from './pages/Reservations.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import CreateListing from './pages/CreateListing.jsx';
import ListingsAdmin from './pages/ListingsAdmin.jsx';
import EditListing from './pages/EditListing.jsx';
export default function App(){ return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/locations" element={<Locations/>}/><Route path="/locations/:id" element={<ListingDetails/>}/><Route path="/login" element={<Login/>}/><Route element={<ProtectedRoute/>}><Route path="/reservations" element={<Reservations/>}/></Route><Route element={<ProtectedRoute hostOnly/>}><Route path="/admin" element={<AdminDashboard/>}/><Route path="/admin/create" element={<CreateListing/>}/><Route path="/admin/listings" element={<ListingsAdmin/>}/><Route path="/admin/listings/:id/edit" element={<EditListing/>}/></Route></Routes></>; }
