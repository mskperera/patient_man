import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaBars, FaTimes, FaSignInAlt, FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaUserDoctor } from 'react-icons/fa6';

function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const navigate = useNavigate();
  const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
  const profileRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-sky-600 text-white fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Patient Management Logo"
            className="h-14 w-auto"
          />
          <span className="ml-2 text-xl font-bold hidden sm:block">
            Patient Management
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Add desktop menu items here if needed */}
        </div>

        {/* Profile and Logged-in Info */}
        <div className="flex items-center gap-3">
          {/* Logged as text with username */}
          {localStorage.getItem('token') && (
            <p className="text-sm font-medium text-white/90 hidden sm:block">
              Logged in as <span className="font-semibold">{user?.displayName || 'unknown'}</span>
            </p>
          )}

          <div className="relative" ref={profileRef}>
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 focus:outline-none hover:bg-sky-700 p-2 rounded-full transition-colors duration-200"
              aria-label="Profile menu"
            >
              <FaUserCircle size={28} />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
                {localStorage.getItem('token') && (
<div className="px-4 py-3 border-b border-gray-200 bg-white">
  <h4 className="text-lg font-semibold text-sky-800 mb-1">User Info</h4>
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-gray-700">
      {/* <FaUserDoctor className="text-sky-800 text-xl" /> */}
      <span className="break-words">{user?.displayName || 'Unknown User'}</span>
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-700 capitalize mt-2">
      <FaUserDoctor className="text-sky-800 text-lg" />
      <span className='font-bold'>{user?.userRoleName || 'N/A'}</span>
    </div>
  </div>
</div>
                )}
                {!localStorage.getItem('token') ? (
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      navigate('/login');
                      toggleProfile();
                    }}
                  >
                    <FaSignInAlt size={20} className="mr-3 text-gray-600" />
                    Login
                  </button>
                ) : (
                  <button
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      navigate('/');
                      toggleProfile();
                    }}
                  >
                    <FaPowerOff size={20} className="mr-3 text-red-600" />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-sky-700 py-4">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-sky-800"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/patients"
            className="block px-4 py-2 hover:bg-sky-800"
            onClick={toggleMenu}
          >
            Patients
          </Link>
          <Link
            to="/notes"
            className="block px-4 py-2 hover:bg-sky-800"
            onClick={toggleMenu}
          >
            Notes
          </Link>
        </div>
      )}
    </nav>
  );
}

export default TopNav;