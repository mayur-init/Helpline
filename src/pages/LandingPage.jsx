import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { data } from 'autoprefixer';

function LandingPage() {

  const [location, setLocation] = useState();

  useEffect(() => { }, [location]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let longitude = position.coords.longitude;
        let lattitude = position.coords.latitude;

        //console.log(longitude + " " + lattitude);

        try {

          let data = {
            lattitude,
            longitude,
          }

          let config = {
            method: 'get',
            url: 'http://localhost:5000/getNearby',
            headers: {},
            data: data,
          }

          let response = await axios.request(config);
          if(response.data.error_message){
            console.log(response.data.error_message);
          }else{
            console.log(response.data);
          }
          

        } catch (err) {
          console.log(err);
        }

        setLocation({
          "lattitude": lattitude,
          "longitude": longitude,
        });
      });

    } else {
      console.log('Geolocation navigation not supported by your browser');
    }
  }

  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
      <Navbar />
      <div className='min-h-[90vh] flex justify-center'>
        <div className='mt-[10vh] flex flex-col items-center'>
          <h1 className='text-4xl font-semibold text-gray-600 m-4'>Find your location</h1>
          {!location ? <p className='flex justify-center'><button onClick={getLocation} className='btn'>My location</button></p>
            : <div>
              <p className='text-xl'>{`lattitude: ${location.lattitude}, longitude: ${location.longitude}`}</p>
            </div>
          }
        </div>
        {/* <p className='text-3xl font-medium text-gray-500'>landing page content</p> */}
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage