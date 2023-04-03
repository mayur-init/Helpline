import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BloodBankPage from './pages/BloodBankPage';
import DonorDetailsPage from './pages/DonorDetailsPage';
import DonorRegisterPage from './pages/DonorRegisterPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EnquiryPage from './pages/EnquiryPage'
import AmbulanceServicePage from './pages/AmbulanceServicePage'
import OxygenCylinderPage from './pages/OxygenCylinderPage'

function App(){
  return(
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} exact />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/blood-bank-service' element={<BloodBankPage/>}/>
          <Route path='/donor-register' element={<DonorRegisterPage/>}/>
          <Route path='/donor-details' element={<DonorDetailsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/enquiry' element={<EnquiryPage/>}/>
          <Route path='/ambulance-service' element={<AmbulanceServicePage/>}/>
          <Route path='/oxygen-cylinder-service' element={<OxygenCylinderPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
