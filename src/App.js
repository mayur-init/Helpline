import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import BloodPage from './pages/BloodPage';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
