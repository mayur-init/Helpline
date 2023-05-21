import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { data } from 'autoprefixer';
import Services from '../components/Services';
import LandingHero from '../components/Heroes/LandingHero';
import { HiOutlineMapPin } from 'react-icons/hi2';
import UserRegister from '../components/Registers/UserRegister';
import { globalStateContext } from '../contexts/globalStateContext'
import { toast } from 'react-hot-toast';
import {  HiXMark } from 'react-icons/hi2'

function LandingPage() {

  const [location, setLocation] = useState();
  const { setUserName, setUserLoggedIn, setUserMongoId, setUserId, setUserLocation, isUserLoggedIn, userlocation, userId } = useContext(globalStateContext);
  
  useEffect(() => {
      verifyUserLogin();
  }, []);

  //fetching use longitude and lattitude
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let longitude = position.coords.longitude;
        let lattitude = position.coords.latitude;

        setLocation({
          "lattitude": lattitude,
          "longitude": longitude,
        });
      });

    } else {
      console.log('Geolocation navigation not supported by your browser');
    }
  }

  //verying if use is logged in
  const verifyUserLogin = async () => {
    const user_access_token = localStorage.getItem('helpline_access_token');
    if (user_access_token !== null) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/verifyuser`, {
          AccessToken: user_access_token,
        });

        const UserData = res.data;
        setUserName(UserData.userName);
        setUserId(UserData.regdId);
        setUserLoggedIn(true);
        setUserLocation(UserData.location);
        setUserMongoId(UserData._id);
        toast.success(`Welcome ${UserData.userName}`);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  //updating user location on loging in
  const updateUserLocation = async () =>{
    //getting user location
    const response = await axios.request(options);
    const newLocation = response.data[0].City;

    if(newLocation === "Āsansol"){
      newLocation = "Asansol"
    }

    if(newLocation !== userlocation){
      //update userlocation
      setUserLocation(newLocation);
      //update userLocation in db
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/updateuserlocation`, {
        UserId: userId,
        NewLocation: newLocation
      });
    }
  }

  if(location !== undefined){
    const options = {
      method: 'GET',
      url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
      params: {
        latitude: location.lattitude,
        longitude: location.longitude,
        range: '0'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
      }
    };
    updateUserLocation();
  }

  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
      <Navbar />
      <LandingHero />
      <Services />

      {/******************Add your location*************************/}
      <div className='h-auto w-full flex justify-center mb-8 mt-4'>
        <div className='bg-white w-[68.5vw] md:w-[73vw] h-auto mt-[4vh] text-center p-4 self-center mb-[10vh] rounded-xl shadow-2xl'>
          <div className='flex flex-col justify-center h-full w-full p-4'>
            {location &&
            <div className='flex justify-end'>
              <button onClick={()=>{setLocation(!location)}}><HiXMark size={30}/></button>
            </div>
            }
            <h1 className='text-3xl font-semibold text-gray-800 mx-6 my-2 hover:text-violet-600'>Add your location</h1>
            {!location ?
              (<div className='flex justify-center'>
                <p className='self-center'><button onClick={getLocation} className='btn flex justify-center m-2'>My location</button></p>
              </div>) :
              (<div className='w-full'>
                <UserRegister location={location} setLocation={setLocation} />
              </div>)
            }
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default LandingPage

