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

function LandingPage() {

  const [location, setLocation] = useState();

  

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
      <LandingHero />
      <Services />
      {/*********************How it works****************************/}
      <div className='bg-white w-[75vw] ml-[12vw] grid grid-cols-2 shadow-2xl text-center mt-[6vh] p-7 mx-[2.4vw] mb-[6vh] rounded-xl'>
        <div className='py-4' >
          <img className='w-[32vw] h-[50vh]' src={'assets/img2.webp'} alt="/" />
        </div>
        <div className='h-[30vh] px-8 py-2' >
          <h1 className='text-2xl md:text-4xl font-bold mx-5 mb-4 text-start hover:text-violet-600'>How It Works?</h1>
          <div className='text-gray-500 font-semibold'>
            <div className='flex'>
              <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>1</span>
              <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Add your location</p>
            </div>
            <div className='flex'>
              <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>2</span>
              <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Choose Nearest Ambulance</p>
            </div>
            <div className='flex'>
              <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>3</span>
              <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Book an Ambulance Easily</p>
            </div>
            <div className='flex' id='userRegister'>
              <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>4</span>
              <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Track your Ambulance</p>
            </div>
          </div>
        </div>
      </div>

      {/******************Add your location*************************/}
      <div className='h-auto w-full flex justify-center mb-8'>
        <div className='bg-white w-[75.5vw] h-auto mt-[4vh] py-[2vh] mx-8 self-center mb-[10vh] rounded-xl shadow-2xl'>
          <div className='flex flex-col justify-center items-center h-full w-full'>
            <h1 className='text-4xl font-semibold text-gray-600 mx-6 my-4 hover:text-violet-600'>Add your location</h1>
            {!location ?
              (<div className='flex justify-center'>
                <p className='self-center'><button onClick={getLocation} className='btn flex justify-center m-4'>My location</button></p>
                {/* <HiOutlineMapPin className='w-6 h-6 m-2 hover:scale-150'/> */}
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