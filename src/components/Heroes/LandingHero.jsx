import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LandingHero = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white' id='hero'>
      <div className='grid md:grid-cols-2 md:w-[70vw] text-center m-6'>
        <motion.div className='flex flex-col justify-center md:items-start w-full mt-0 md:mt-[18vh] mb-4'
          initial={{x:-400}} animate={{x:0}} transition={{delay:0.1}}>
          <h1 className='p-2 text-4xl md:text-6xl text-gray-400 font-bold'>Book Your</h1>
          <h1 className='px-4 text-6xl md:text-8xl font-bold hover:text-violet-600'>Services</h1>
        </motion.div>
        <div className='flex justify-center w-full'>
          <motion.img className='w-full md:w-[100vw] h-[35vh] md:h-[50vh] rounded-md' src={'assets/img1.jpg'} alt="/" 
            initial={{x:600}} animate={{x:0}} transition={{delay:0.1}}/>
        </div>
      </div>
    </div>
  )
}

export default LandingHero;