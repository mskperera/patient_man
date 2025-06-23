import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Explicit imports
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import BottomBar from './components/BottomBar';
import PatientList from './pages/patientList';
import Home from './components/Home';
import PatientReport from './components/PatientReport';
import PatientInfoEdit from './components/PatientInfoEdit';
import AppointmentCalendar from './components/AppointmentCalendar';
import PatientTypeSelection from './pages/PatientTypeSelection';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <TopNav />
        <div className="flex pt-16 pb-12">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-64 p-0 overflow-auto">
            <div className="container mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/patients" element={<PatientList />} />
                 <Route path="/patientType" element={<PatientTypeSelection />} />
                <Route path="/patient" element={<PatientInfoEdit />} />
                {/* <Route path="/add-patient" element={<PatientInfo mode="add" />} /> */}
                {/* <Route path="/add-note" element={<Notes />} /> */}
                {/* <Route path="/edit-patient/:id" element={<PatientInfoEdit />} /> */}
                <Route path="/add-patient" element={<PatientInfoEdit mode="add" />} />
                {/* <Route path="/notes" element={<Notes />} /> */}
                <Route path="/patients/report/:id" element={<PatientReport />} />
                <Route path="/appointments" element={<AppointmentCalendar />} />
               
              </Routes>
            </div>
          </main>
        </div>
        <BottomBar />
      </div>
    </BrowserRouter>
  );
}

export default App;