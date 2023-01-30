import React from 'react'
import Footer from '../components/Footer'
import HeroBlood from '../components/HeroBlood'
import Navbar from '../components/Navbar'
function BloodPage() {
    return (
        <div className='bg-zinc-200'>
            <Navbar />
            <HeroBlood />
            <div className='bg-white flex md:flex-row justify-between flex-col shadow-2xl text-center mt-[8vh] p-8 mx-[2.4vw] mb-[6vh] rounded-xl'>
                <div>
                    <img className='w-[70vw] h-[40vh] md:w-[45vw] md:h-[70vh]' src={'assets/donationFact.webp'} alt="/" />
                </div>
                <div>
                    <img className='md:w-[32vw] md:h-[70vh]' src={'assets/bloodchart1.jpg'} alt="/" />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default BloodPage
