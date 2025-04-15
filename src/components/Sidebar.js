import React, { useState } from 'react';
import { FaHome, FaUsers, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] shadow-lg border-r border-slate-300 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } z-40 md:w-64`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-[#f8fafc] to-[#e2e8f0]">
        <span
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:block font-semibold text-slate-800 text-lg tracking-tight`}
        >
          Menu
        </span>
        <button
          className="md:hidden text-slate-500 hover:text-sky-500 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          {isOpen ? '◄' : '►'}
        </button>
      </div>
      <nav className="mt-4">
        <Link
          to="/"
          className={`group flex items-center p-4 text-slate-800 relative hover:bg-sky-50 hover:text-sky-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            location.pathname === '/'
              ? 'bg-sky-100 text-sky-600 font-bold border-l-4 border-sky-500'
              : ''
          }`}
          aria-label="Navigate to Home"
        >
          <FaHome
            size={20}
            className="text-slate-600 group-hover:text-sky-500 group-hover:scale-110 transition-transform duration-200"
          />
          <span
            className={`${
              isOpen ? 'ml-3' : 'hidden'
            } md:ml-3 md:block font-medium`}
          >
            Home
          </span>
          {!isOpen && (
            <span className="absolute left-16 bg-slate-800 text-white text-sm rounded-md px-2 py-1 hidden group-hover:block md:hidden z-50">
              Home
            </span>
          )}
        </Link>
        <Link
          to="/patients"
          className={`group flex items-center p-4 text-slate-800 relative hover:bg-sky-50 hover:text-sky-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            location.pathname === '/patients'
              ? 'bg-sky-100 text-sky-600 font-bold border-l-4 border-sky-500'
              : ''
          }`}
          aria-label="Navigate to Patient List"
        >
          <FaUsers
            size={20}
            className="text-slate-600 group-hover:text-sky-500 group-hover:scale-110 transition-transform duration-200"
          />
          <span
            className={`${
              isOpen ? 'ml-3' : 'hidden'
            } md:ml-3 md:block font-medium`}
          >
            Patient List
          </span>
          {!isOpen && (
            <span className="absolute left-16 bg-slate-800 text-white text-sm rounded-md px-2 py-1 hidden group-hover:block md:hidden z-50">
              Patient List
            </span>
          )}
        </Link>
        <button
          onClick={() => navigate('/add-patient', { state: { mode: 'add' } })}
          className={`group flex items-center p-4 text-slate-800 relative hover:bg-sky-50 hover:text-sky-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full text-left ${
            location.pathname === '/add-patient'
              ? 'bg-sky-100 text-sky-600 font-bold border-l-4 border-sky-500'
              : ''
          }`}
          aria-label="Navigate to Add Patient"
        >
          <FaUserPlus
            size={20}
            className="text-slate-600 group-hover:text-sky-500 group-hover:scale-110 transition-transform duration-200"
          />
          <span
            className={`${
              isOpen ? 'ml-3' : 'hidden'
            } md:ml-3 md:block font-medium`}
          >
            Add Patient
          </span>
          {!isOpen && (
            <span className="absolute left-16 bg-slate-800 text-white text-sm rounded-md px-2 py-1 hidden group-hover:block md:hidden z-50">
              Add Patient
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;