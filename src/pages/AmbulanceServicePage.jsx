import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AmbulanceServiceHero from '../components/Heroes/AmbulanceServiceHero'

function AmbulanceServicePage() {
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