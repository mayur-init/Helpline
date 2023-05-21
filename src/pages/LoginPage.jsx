import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLogin from '../components/Loginforms/UserLogin'
import ServiceProviderLogin from '../components/Loginforms/ServiceProviderLogin'
import { motion } from 'framer-motion'

function LoginPage() {

  const [form, setform] = useState(1);

  return (
    <div className='bg-gray-200'>
      <Navbar />
      <div className='h-[100vh] md:pt-[12vh] bg-white flex flex-col md:flex-row md:justify-between'>
        <div className='md:my-[8vh] md:ml-[15vw] md:mr-[2vw]'>
          <motion.img src='assets/loginPage.jpg' className='w-[90vw] m-auto h-[90vw] sm:w-[80vw] sm:h-[60vw] md:w-[70vw] md:h-[65vh]'
            initial={{ x: -400 }} animate={{ x: -10 }} transition={{ delay: 0.1 }} />
        </div>
        <motion.div className='w-[80vw] md:mt-[10vh] h-auto flex justify-end md:justify-start items-center'
          initial={{ x: 400 }} animate={{ x: 40 }} transition={{ delay: 0.1 }}>
          <div className='flex flex-col justify-center items-center my-6'>
            <p className='text-3xl md:text-4xl font-bold self-center w-[70vw] md:w-[30vw] p-2  hover:text-violet-600'>By Loging in as</p>
            <p className='text-3xl md:text-4xl font-bold self-center w-[70vw] md:w-[30vw] p-2  hover:text-violet-600'>a member, your can help</p>
            <p className='text-3xl md:text-4xl font-bold self-center w-[70vw] md:w-[30vw] p-2  hover:text-violet-600'>in this noble project</p>
          </div>
        </motion.div>
      </div>
      <div className='my-[4vh] mx-[2vh]'>
        <div className='flex flex-col text-center justify-end'>
          <div className='flex justify-end'>
            <button className='btn text-sm w-[18vw] md:w-[4vw] my-4 mx-2' onClick={() => { setform(1) }}>User</button>
            <button className='btn text-sm w-[35vw] md:w-[10vw] my-4 mx-2' onClick={() => { setform(2) }}>Service Provider</button>
          </div>
          <p><h1 className='text-2xl md:text-4xl font-medium self-center my-4 hover:text-violet-600' id='loginForm'>Login as a member</h1></p>
        </div>
      </div>
      <div className='mb-[6vh]'>
        {
          form === 1 ? <UserLogin /> : <ServiceProviderLogin />
        }
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage