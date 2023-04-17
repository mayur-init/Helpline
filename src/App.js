import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BloodBankPage from './pages/BloodBankPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EnquiryPage from './pages/EnquiryPage'
import AmbulanceServicePage from './pages/AmbulanceServicePage'
import OxygenCylinderPage from './pages/OxygenCylinderPage'
import UserPanel from './pages/PanelPages/UserPanel'
import AmbulanceServiceProviderPanel from './pages/PanelPages/AmbulanceServiceProviderPanel'
import BloodBankServiceProviderPanel from './pages/PanelPages/BloodBankServiceProviderPanel'
import OxygenCylinderProviderPanel from './pages/PanelPages/OxygenCylinderProviderPanel'
import AdminPanel from './pages/PanelPages/AdminPanel'
import { globalStateContext } from './contexts/globalStateContext'
import { Toaster } from 'react-hot-toast'

function App() {

  const [userName, setUserName] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <globalStateContext.Provider value={{ userName, setUserName, location, setLocation, isLoggedIn, setLoggedIn }}>
        {/************react-notification**************/}
        <Toaster 
          position='top-right'
          toastOptions={{
            success: {
              theme: {
                primary: "green-400"
              }
            },
            // error: {
            //   theme: {
            //     primary: red-200
            //   }
            // }
          }}
        />
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} exact />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/blood-bank-service' element={<BloodBankPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/enquiry' element={<EnquiryPage />} />
            <Route path='/ambulance-service' element={<AmbulanceServicePage />} />
            <Route path='/oxygen-cylinder-service' element={<OxygenCylinderPage />} />
            <Route path='/user-panel' element={<UserPanel />} />
            <Route path='/ambulance-service-provider-panel' element={<AmbulanceServiceProviderPanel />} />
            <Route path='/blood-bank-service-provider-panel' element={<BloodBankServiceProviderPanel />} />
            <Route path='/oxygen-cylinder-provider-panel' element={<OxygenCylinderProviderPanel />} />
            <Route path='/admin-panel' element={<AdminPanel />} />
          </Routes>
        </Router>
      </globalStateContext.Provider>
    </div>
  );
}

export default App;
