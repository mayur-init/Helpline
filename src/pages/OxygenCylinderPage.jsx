import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OxygenCylinderHero from '../components/Heroes/OxygenCylinderHero'

function OxygenCylinderPage() {
  return (
    <div className='bg-zinc-200' id='main'>
            <Navbar/>
            <OxygenCylinderHero/>
            <Footer/>
    </div>
  )
}

export default OxygenCylinderPage