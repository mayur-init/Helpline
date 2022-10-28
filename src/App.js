import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';

function App(){
  return(
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} exact />
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
