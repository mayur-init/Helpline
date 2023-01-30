import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BloodPage from './pages/BloodPage';
import DonorDetailsPage from './pages/DonorDetailsPage';
import DonorRegisterPage from './pages/DonorRegisterPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
function App(){
  return(
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} exact />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/blood' element={<BloodPage/>}/>
          <Route path='/donor' element={<DonorRegisterPage/>}/>
          <Route path='/donorDetails' element={<DonorDetailsPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
