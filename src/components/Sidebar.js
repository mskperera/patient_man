import React, { useState } from 'react';
import { FaHome, FaUsers, FaUserPlus, FaCalendarAlt, FaList } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: <FaHome size={22} />,
    ariaLabel: 'Navigate to Home',
  },
  {
    to: '/patients',
    label: 'Patient List',
    icon: <FaList size={22} />,
    ariaLabel: 'Navigate to Patient List',
  },
  {
    to: { pathname: '/patientType', search: '?mode=add' },
    label: 'Add Patient',
    icon: <FaUserPlus size={22} />,
    ariaLabel: 'Navigate to Add Patient',
  },
  {
    to: { pathname: '/appointments', search: '?mode=add' },
    label: 'Appointments',
    icon: <FaCalendarAlt size={22} />,
    ariaLabel: 'Navigate to Appointments',
  },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-gradient-to-b from-sky-600 to-sky-600 shadow-sm border-r border-sky-200 rounded-r-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } z-40 md:w-64`}
    >
      <div className="flex items-center justify-between p-4 border-b border-sky-200">
        <span
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:block font-semibold text-white text-xl tracking-tight`}
        >
          Menu
        </span>
        <button
          className="md:hidden text-white hover:text-sky-200 transition-colors duration-200 p-2 rounded-full bg-sky-700 hover:bg-sky-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          {isOpen ? '◄' : '►'}
        </button>
      </div>
      <nav className="mt-4 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.to.pathname || item.to}
            to={item.to}
            className={`group flex items-center mb-2 p-4 relative rounded-md mx-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
              location.pathname === (item.to.pathname || item.to)
                ? 'bg-sky-50 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
                : 'text-white hover:bg-sky-700 hover:text-white'
            }`}
            aria-label={item.ariaLabel}
          >
            {React.cloneElement(item.icon, {
              className: `group-hover:scale-110 transition-transform duration-200 ${
                location.pathname === (item.to.pathname || item.to)
                  ? 'text-sky-700'
                  : 'text-white group-hover:text-sky-200'
              }`,
            })}
            <span
              className={`${
                isOpen ? 'ml-4' : 'hidden'
              } md:ml-4 md:block font-medium text-base`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
       <div className="absolute bottom-4 w-full text-center">
        <p className={`${isOpen ? 'block' : 'hidden'} md:block text-white text-sm font-medium`}>
          Powered by{' '}
          <a
            href="https://legendbyte.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sky-200 transition-colors duration-200"
          >
            Legendbyte
          </a>
        </p>
        {/* <p className={`${isOpen ? 'block' : 'hidden'} md:block text-white text-xs font-light mt-1`}>
         " Freedom and Innovation for a Living Planet."
        </p> */}
      </div>
    </div>
  );
}

export default Sidebar;












// import React, { useState } from 'react';
// import { FaHome, FaUsers, FaUserPlus, FaCalendarAlt, FaList } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom';

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <div
//       className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-gradient-to-b from-sky-600 to-sky-600 shadow-sm border-r border-sky-200 rounded-r-lg transition-all duration-300 ease-in-out ${
//         isOpen ? 'w-64' : 'w-16'
//       } z-40 md:w-64`}
//     >
//       {/* <div className="flex items-center justify-between p-4 border-b border-slate-300 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
//         <span
//           className={`${
//             isOpen ? 'block' : 'hidden'
//           } md:block font-semibold text-slate-900 text-xl tracking-tight`}
//         >
//           Menu
//         </span>
//         <button
//           className="md:hidden text-slate-600 hover:text-sky-500 transition-colors duration-200 p-2 rounded-full bg-slate-100 hover:bg-slate-200"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle sidebar"
//         >
//           {isOpen ? '◄' : '►'}
//         </button>
//       </div> */}
//       <nav className="mt-4">
//         <Link
//           to="/"
//           className={`group flex items-center mb-2 p-4 text-white relative hover:bg-sky-400 hover:text-sky-600 transition-all duration-200 rounded-md mx-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
//             location.pathname === '/'
//               ? 'bg-sky-100 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
//               : ''
//           }`}
//           aria-label="Navigate to Home"
//         >
//           <FaHome
//             size={22}
//             className="text-white group-hover:text-sky-600 group-hover:scale-110 transition-transform duration-200"
//           />
//           <span
//             className={`${
//               isOpen ? 'ml-4' : 'hidden'
//             } md:ml-4 md:block font-medium text-base`}
//           >
//             Home
//           </span>
//           {/* {!isOpen && (
//             <span className="absolute left-14 bg-slate-900 text-white text-sm rounded-md px-3 py-1.5 hidden group-hover:block md:hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               Home
//             </span>
//           )} */}
//         </Link>
//         <Link
//           to="/patients"
//           className={`group flex items-center mb-2 p-4 text-slate-900 relative
//              hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 rounded-md mx-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
//             location.pathname === '/patients'
//               ? 'bg-sky-100 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
//               : ''
//           }`}
//           aria-label="Navigate to Patient List"
//         >
//           <FaList
//             size={22}
//             className="text-slate-700 group-hover:text-sky-600 group-hover:scale-110 transition-transform duration-200"
//           />
//           <span
//             className={`${
//               isOpen ? 'ml-4' : 'hidden'
//             } md:ml-4 md:block font-medium text-base`}
//           >
//             Patient List
//           </span>
//           {/* {!isOpen && (
//             <span className="absolute left-14 bg-slate-900 text-white text-sm rounded-md px-3 py-1.5 hidden group-hover:block md:hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               Patient List
//             </span>
//           )} */}
//         </Link>

//             <Link
//            to={{
//     pathname: "/patientType",
//     search: "?mode=add"
//   }}
//           className={`group flex items-center mb-2 p-4 text-slate-900 relative hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 rounded-md mx-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
//             location.pathname === '/patientType'
//               ? 'bg-sky-100 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
//               : ''
//           }`}
//           aria-label="Navigate to Add Patient"
//         >

//           <FaUserPlus
//             size={22}
//             className="text-slate-700 group-hover:text-sky-600 group-hover:scale-110 transition-transform duration-200"
//           />
//           <span
//             className={`${
//               isOpen ? 'ml-4' : 'hidden'
//             } md:ml-4 md:block font-medium text-base`}
//           >
//             Add Patient
//           </span>
//           {/* {!isOpen && (
//             <span className="absolute left-14 bg-slate-900 text-white text-sm rounded-md px-3 py-1.5 hidden group-hover:block md:hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               Add Patient
//             </span>
//           )} */}

//           </Link>



//        <Link
//            to={{
//     pathname: "/appointments",
//     search: "?mode=add"
//   }}
//           className={`group flex items-center mb-2 p-4 text-slate-900 relative hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 rounded-md mx-2 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
//             location.pathname === '/appointments'
//               ? 'bg-sky-100 text-sky-700 font-bold border-l-4 border-sky-500 shadow-sm'
//               : ''
//           }`}
//           aria-label="Navigate to Add Patient"
//         >

//           <FaCalendarAlt
//             size={22}
//             className="text-slate-700 group-hover:text-sky-600 group-hover:scale-110 transition-transform duration-200"
//           />
//           <span
//             className={`${
//               isOpen ? 'ml-4' : 'hidden'
//             } md:ml-4 md:block font-medium text-base`}
//           >
//             Appointments
//           </span>
//           {/* {!isOpen && (
//             <span className="absolute left-14 bg-slate-900 text-white text-sm rounded-md px-3 py-1.5 hidden group-hover:block md:hidden z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               Appointments
//             </span>
//           )} */}

//           </Link>

//       </nav>
//     </div>
//   );
// }

// export default Sidebar;