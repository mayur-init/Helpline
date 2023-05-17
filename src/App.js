import React, { useState, useRef, useEffect } from 'react';
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
import HospitalPanel from './pages/PanelPages/HospitalPanel'
import AdminPanel from './pages/PanelPages/AdminPanel'
import { globalStateContext } from './contexts/globalStateContext'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios';

function App() {

  // localStorage.setItem('helpline_access_token', '');
  // localStorage.setItem('helpline_refresh_token', '');
  
  const [userName, setUserName] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [isProviderLoggedIn, setProviderLoggedIn] = useState(false);
  const [userMongoId, setUserMongoId] = useState(null);

  useEffect(() => {
    verifyUserLogin();
  }, []);

  const verifyUserLogin = async () => {
    const user_access_token = localStorage.getItem('helpline_access_token');
    if (user_access_token !== null) {
      try {
        const res = await axios.post('http://localhost:5000/api/verifyuser', {
          AccessToken: user_access_token,
        });

        const UserData = res.data;
        setUserName(UserData.userName);
        setUserId(UserData.regdId);
        setUserLoggedIn(true);
        setLocation(UserData.location);
        setUserMongoId(UserData._id);
        toast.success(`Welcome ${UserData.userName}`);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // console.log(location);


  return (
    <div className='overflow-hidden scroll-smooth'>
      <globalStateContext.Provider value={{ userName, setUserName, userId, userMongoId, setUserMongoId, setUserId, location, setLocation, isUserLoggedIn, setUserLoggedIn, isProviderLoggedIn, setProviderLoggedIn }}>
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
              <Route path='/ambulance-service-provider-panel/:RegdId' element={<AmbulanceServiceProviderPanel />} />
              <Route path='/blood-bank-service-provider-panel/:RegdId' element={<BloodBankServiceProviderPanel />} />
              <Route path='/oxygen-cylinder-provider-panel/:RegdId' element={<OxygenCylinderProviderPanel />} />
              <Route path='/hospital-service-panel/:RegdId' element={<HospitalPanel />} />
              <Route path='/admin-panel' element={<AdminPanel />} />
            </Routes>
          </Router>
      </globalStateContext.Provider>
    </div>
  );
}

export default App;
