import React from 'react'
import { Link } from 'react-router-dom'
import Donor from '../pages/DonorRegisterPage'

function HeroBlood() {
  return (
    <div name='home' className='w-full h-screen bg-white  flex flex-col justify-between'>
                {/* Hero Page Start */}
                <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                    <div>
                        <img className='w-full mix-blend-multiply' src={'assets/blood1.webp'} alt="/" />
                    </div>
                    <div className='flex flex-col justify-center md:items-start w-full px-12'>
                        <p className='text-3xl md:text-4xl font-semibold'>Donate <span className='text-red-600 font-bold'>Blood</span> Give The Gift of Life</p>
                        <h1 className='py-3 text-5xl md:text-7xl font-bold text-red-600 hover:scale-105'>Our Blood Services</h1>
                        <div className='flex m-4'>
                            <Link to='/donor'><button className='btn py-3 px-5 my-4 mx-3' >Register as Donor</button></Link>
                            <Link to='/donorDetails'><button className='btn py-3 px-5 my-4 bg-red-500'>Find a Donor</button></Link>
                        </div>
                    </div>
                </div>
                {/* Hero Page Ends */}
                
            </div>
  )
}

export default HeroBlood
