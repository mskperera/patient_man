import React, { useState } from 'react';
import { FaHome, FaUsers, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-gradient-to-b from-gray-50 to-gray-200 shadow-xl border-r border-slate-200 rounded-r-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } z-40 md:w-64`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-300 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
        <span
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:block font-semibold text-slate-900 text-xl tracking-tight`}
        >
          Menu
        </span>
        <button
          className="md:hidden text-slate-600 hover:text-sky-500 transition-colors duration-200 p-2 rounded-full bg-slate-100 hover:bg-slate-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          {isOpen ? '◄' : '►'}
        </button>
      </div>
      <nav className="mt-4">
        <Link
          to="/"
          className={`group flex items-center mb-2 p-4 text-slate-900 relative hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 rounded-md mx-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            location.pathname === '/'
              ? 'bg-sky-100 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
              : ''
          }`}
          aria-label="Navigate to Home"
        >
          <FaHome
            size={22}
            className="text-slate-700 group-hover:text-sky-600 group-hover:scale-110 transition-transform duration-200"
          />
          <span
            className={`${
              isOpen ? 'ml-4' : 'hidden'
            } md:ml-4 md:block font-medium text-base`}
          >
            Home
          </span>
          {!isOpen && (
            <span className="absolute left-14 bg-slate-900 text-white text-sm rounded-md px-3 py-1.5 hidden group-hover:block md:hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Home
            </span>
          )}
        </Link>
        <Link
          to="/patients"
          className={`group flex items-center mb-2 p-4 text-slate-900 relative hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 rounded-md mx-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            location.pathname === '/patients'
              ? 'bg-sky-100 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
              : ''
          }`}
          aria-label="Navigate to Patient List"
        >
          <FaUsers
            size={22}
            className="text-slate-700 group-hover:text-sky-600 group-hover:scale-110 transition-transform duration-200"
          />
          <span
            className={`${
              isOpen ? 'ml-4' : 'hidden'
            } md:ml-4 md:block font-medium text-base`}
          >
            Patient List
          </span>
          {!isOpen && (
            <span className="absolute left-14 bg-slate-900 text-white text-sm rounded-md px-3 py-1.5 hidden group-hover:block md:hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Patient List
            </span>
          )}
        </Link>

            <Link
           to={{
    pathname: "/add-patient",
    search: "?mode=add"
  }}
          className={`group flex items-center mb-2 p-4 text-slate-900 relative hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 rounded-md mx-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
            location.pathname === '/add-patient'
              ? 'bg-sky-100 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
              : ''
          }`}
          aria-label="Navigate to Add Patient"
        >

          <FaUserPlus
            size={22}
            className="text-slate-700 group-hover:text-sky-600 group-hover:scale-110 transition-transform duration-200"
          />
          <span
            className={`${
              isOpen ? 'ml-4' : 'hidden'
            } md:ml-4 md:block font-medium text-base`}
          >
            Add Patient
          </span>
          {!isOpen && (
            <span className="absolute left-14 bg-slate-900 text-white text-sm rounded-md px-3 py-1.5 hidden group-hover:block md:hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Add Patient
            </span>
          )}

          </Link>
      </nav>
    </div>
  );
}

export default Sidebar;