import React, {useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OxygenCylinderHero from '../components/Heroes/OxygenCylinderHero'
import { globalStateContext } from '../contexts/globalStateContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function OxygenCylinderPage() {

  const navigate = useNavigate();

    const { isUserLoggedIn } = useContext(globalStateContext);
    useEffect(() => {
        if (!isUserLoggedIn) {
            toast.error('You are not logged in, log in first')
            navigate('/login#loginForm', { replace: true });
        }
    });
    
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className='bg-zinc-200' id='main'>
            <Navbar/>
            <OxygenCylinderHero/>
            <Footer/>
    </motion.div>
  )
}

export default OxygenCylinderPage