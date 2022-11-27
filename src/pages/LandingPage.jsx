import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { data } from 'autoprefixer';
import About from '../components/About';
import Hero from '../components/Hero';
import { HiOutlineMapPin } from 'react-icons/hi2';
import UserRegister from '../components/UserRegister';

function LandingPage() {

  const [location, setLocation] = useState();

  useEffect(() => { }, [location]);

  function getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let longitude = position.coords.longitude;
        let lattitude = position.coords.latitude;

        setLocation({
          "lattitude": lattitude,
          "longitude": longitude,
        });

        let data = {
          lattitude,
          longitude,
        }
        
        //console.log(data);

        // try {
        //   let config = {
        //     method: 'get',
        //     url: 'http://localhost:5000/getNearby',
        //     headers: {},
        //     data: data,
        //   }

        //   let response = await axios.request(config);

        //   if (response.data.error_message) {
        //     console.log(response.data.error_message);
        //   } else {
        //     console.log(response.data);
        //   }
        // } catch (err) {
        //   console.log(err);
        // }
        
      });

    } else {
      console.log('Geolocation navigation not supported by your browser');
    }
  }

  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
      <Navbar />
      <Hero />
      <About />
      <div className='bg-white w-[75.5vw] h-auto py-[5vh] mx-8 self-center mb-[10vh] rounded-xl shadow-2xl'>
        <div className='flex flex-col justify-center items-center h-full w-full'>
          <h1 className='text-4xl font-semibold text-gray-600 mx-6 my-4 hover:text-violet-600'>Add your location</h1>
          {!location ?
            (<div className='flex justify-center'>
              <p className='self-center'><button onClick={getLocation} className='btn flex justify-center m-4'>My location</button></p>
              {/* <HiOutlineMapPin className='w-6 h-6 m-2 hover:scale-150'/> */}
            </div>) :
            (<div className='w-full'>
              <UserRegister location = {location} setLocation = {setLocation}/>
            </div>)
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage