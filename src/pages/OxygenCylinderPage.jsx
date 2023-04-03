import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OxygenCylinderHero from '../components/Heroes/OxygenCylinderHero'

function OxygenCylinderPage() {
  return (
    <div className='bg-zinc-200' id='main'>
            <Navbar/>
            <OxygenCylinderHero/>
            <div className="w-full h-[100vh]">
                {/***********oxygen cyliinder service page content************/}
            </div>
            <Footer/>
    </div>
  )
}

export default OxygenCylinderPage