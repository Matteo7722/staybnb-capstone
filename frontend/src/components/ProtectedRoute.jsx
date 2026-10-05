import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
export default function ProtectedRoute({ hostOnly=false }) { const { user } = useAuth(); if (!user) return <Navigate to="/login" replace/>; if (hostOnly && user.role !== 'host') return <Navigate to="/" replace/>; return <Outlet/>; }
