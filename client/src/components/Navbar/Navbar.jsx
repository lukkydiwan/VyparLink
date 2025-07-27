import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); 
  return (
    <nav className="navbar">
      <div className="navbar-container">
     <img  height={100} src="../../public/logo.png" alt="" />

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><Link to="/products">Products</Link> </li>
        </ul>
 {user ? (
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-rose-50 text-rose-600 px-4 py-1 font-medium">
            Hello, {user.name}
          </span>
          <button
            onClick={logout}
            className="nav-btn nav-btn-secondary rose-btn"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login"    className="nav-btn nav-btn-secondary"> <button className='rose-btn'>Get Started</button></Link>
         
        </div>
      )}
  
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
