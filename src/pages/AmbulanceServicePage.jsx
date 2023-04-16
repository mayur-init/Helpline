import React, { useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AmbulanceServiceHero from '../components/Heroes/AmbulanceServiceHero'
import { globalStateContext } from '../contexts/globalStateContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function AmbulanceServicePage() {

  const navigate = useNavigate();

  const {isLoggedIn} = useContext(globalStateContext);
  useEffect(() =>{
    if(!isLoggedIn){
      toast.error('You are not logged in, login first')
      navigate('/login#loginForm', {replace: true});
    }
  });

  return (
    <div className='bg-zinc-200' id='main'>
            <Navbar/>
            <AmbulanceServiceHero/>
            <div className="w-full h-[100vh]">
                {/***********ambulance page content************/}
            </div>
            <Footer/>
    </div>
  )
}

export default AmbulanceServicePage