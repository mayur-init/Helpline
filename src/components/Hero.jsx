import React from 'react'

const Hero = () => {
  return (
    <div name='home' className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Ambulance Booking Service</h1>
                <button className='py-3 px-6 sm:w-[60%] my-4'>Find Your Location</button>
            </div>
            <div>
                <img className='w-full' src={'assets/ambulance.png'} alt="/" />
            </div>
            
        </div>
    </div>
  )
}

export default Hero