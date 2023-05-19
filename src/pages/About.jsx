import React from 'react'
import { motion } from 'framer-motion'
import AboutUsData from '../components/AboutUs/AboutUsData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
    return (
        <div className='w-full h-full bg-[#f5f5f5]'>
            <Navbar />
            <div className='flex flex-col items-center justify-center my-8'>
                <p className='text-2xl font-medium m-4'>Under the Guidence of</p>
                <p className='text-3xl font-semibold hover:text-violet-600 hover:scale-110'>Dr. Khushbu Chandraker</p>
                <p className='text-xl font-semibold'>(Assistant Professor) CSE</p>
            </div>
            <div className='my-4'>
                <h1 className="mt-[3vh] text-center text-5xl font-semibold hover:text-violet-600">Our Team</h1>
            </div>
            <motion.div className="grid place-content-center box-border my-6"
             initial={{x:600}} animate={{x:0}} transition={{delay:0.1}}>
                <div className='grid md:grid-cols-4 text-center md:my-[6vh]'>
                    {AboutUsData.map((item) => {
                        return (
                            <div className='transition ease-in-out delay-20 border w-[60vw] md:w-[18vw] h-auto bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105 hover:bg-gradient-to-b from-[#6045ea] to-[#8567f7] hover:text-[#ffffff]' key={item.id}>
                                <img className='m-auto w-32 h-32 rounded-full hover:scale-110' src={item.image} alt="/" />
                                <p className='text-2xl font-semibold m-4'>{item.name}</p>
                                <p className='text-black-400  text-lg m-4'>{item.role}</p>
                            </div>

                        )
                    })

                    }
                </div>
            </motion.div>
            <Footer />
        </div>
    )
}

export default About
