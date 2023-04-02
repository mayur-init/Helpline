import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BloodPage from './pages/BloodPage';
import DonorDetailsPage from './pages/DonorDetailsPage';
import DonorRegisterPage from './pages/DonorRegisterPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
function App(){
  return(
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} exact />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/blood-bank-services' element={<BloodPage/>}/>
          <Route path='/donor-register' element={<DonorRegisterPage/>}/>
          <Route path='/donor-details' element={<DonorDetailsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
