import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, Search, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [where, setWhere] = useState('');
  const navigate = useNavigate();
  function search(e) { e.preventDefault(); navigate(`/locations${where.trim() ? `?location=${encodeURIComponent(where.trim())}` : ''}`); }
  return <header className="header">
    <Link className="logo" to="/"><span className="logo-mark">⌂</span><span>staybnb</span></Link>
    <form className="search-bar" onSubmit={search}><input value={where} onChange={e=>setWhere(e.target.value)} placeholder="Where are you going?"/><button aria-label="Search"><Search size={19}/></button></form>
    <div className="header-right">{user ? <span className="greeting">Hi, {user.username}</span> : <Link to="/locations" className="host-link">Become a host</Link>}<Globe size={19}/><button className="profile-button" onClick={()=>setOpen(!open)}><Menu size={17}/><UserCircle size={27}/></button>
      {open && <div className="profile-menu">
        {user ? <><div className="menu-user">Hi, {user.username}</div>{user.role === 'host' && <Link to="/admin">Admin dashboard</Link>}<Link to="/reservations">View reservations</Link><button onClick={()=>{logout();setOpen(false);navigate('/')}}>Log out</button></> : <Link to="/login">Log in</Link>}
      </div>}
    </div>
  </header>;
}
