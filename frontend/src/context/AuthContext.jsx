import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const API = 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('staybnb_user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('staybnb_token'));
  useEffect(() => {
    if (user) localStorage.setItem('staybnb_user', JSON.stringify(user)); else localStorage.removeItem('staybnb_user');
    if (token) localStorage.setItem('staybnb_token', token); else localStorage.removeItem('staybnb_token');
  }, [user, token]);
  async function login(email, password) {
    const response = await fetch(`${API}/users/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email, password }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed.');
    setUser(data.user); setToken(data.token); return data.user;
  }
  function logout() { setUser(null); setToken(null); }
  return <AuthContext.Provider value={{ user, token, login, logout, API }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
