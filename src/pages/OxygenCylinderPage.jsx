import React, {useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import OxygenCylinderHero from '../components/Heroes/OxygenCylinderHero'
import { globalStateContext } from '../contexts/globalStateContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

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
    <div className='bg-zinc-200' id='main'>
            <Navbar/>
            <OxygenCylinderHero/>
            <Footer/>
    </div>
  )
}

export default OxygenCylinderPage