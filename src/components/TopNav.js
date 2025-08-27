import React, { useState } from 'react';
import { FaUserCircle, FaBars, FaTimes, FaSignInAlt, FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Assuming React Router for navigation
import logo from '../assets/logo.png'; // Adjust the path to your logo file

function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const navigate=useNavigate();

  return (
    <nav className="bg-sky-600 text-white  fixed top-0 left-0 right-0 z-50">
      <div className=" mx-auto px-4  flex items-center justify-between">
    
{/* Logo */}
<Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Patient Management Logo"
            className="h-14 w-auto" // Adjust size as needed
          />
          {/* Optional: Keep text for accessibility or branding */}
          <span className="ml-2 text-xl font-bold hidden sm:block">
            Patient Management
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/patients" className="hover:text-gray-200 transition">
            Patients
          </Link>
          <Link to="/notes" className="hover:text-gray-200 transition">
            Notes
          </Link> */}
        </div>

        {/* Profile Dropdown */}
    {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center space-x-2 focus:outline-none hover:bg-sky-700 p-2 rounded-full transition-colors duration-200"
            aria-label="Profile menu"
          >
            <FaUserCircle size={28} />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
            {!localStorage.getItem('token') ?  <button
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => {
                  navigate('/login');
                  toggleProfile();
                }}
              >
                <FaSignInAlt size={20} className="mr-3 text-gray-600" />
                Login
              </button>:
              <button
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/');
                  toggleProfile();
                }}
              >
                <FaPowerOff size={20} className="mr-3 text-red-600" />
                Logout
              </button>}
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