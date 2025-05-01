import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Explicit imports
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import BottomBar from './components/BottomBar';
import PatientProfile from './components/PatientProfile';
import PatientList from './components/PatientList';
import PatientInfo from './components/PatientInfo';
import Notes from './components/Notes';
import Home from './components/Home';
import PatientReport from './components/PatientReport';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <TopNav />
        <div className="flex pt-16 pb-12">
          <Sidebar />
          <main className="flex-1 ml-16 md:ml-64 p-4 overflow-auto">
            <div className="container mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/:id" element={<PatientProfile />} />
                <Route path="/add-patient" element={<PatientInfo mode="add" />} />
                <Route path="/add-note" element={<Notes />} />
                <Route path="/edit-patient/:id" element={<PatientInfo />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/patients/report/:id" element={<PatientReport />} />
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