import React, {useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import EnquiryHero from '../components/Heroes/EnquiryHero'
import { globalStateContext } from '../contexts/globalStateContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function EnquiryPage() {

  const navigate = useNavigate();

    const { isLoggedIn } = useContext(globalStateContext);
    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('You are not logged in, login first')
            navigate('/login#loginForm', { replace: true });
        }
    });
  
  return (
    <div className='bg-zinc-200' id='main'>
      <Navbar />
      <EnquiryHero/>
      <div className="w-full h-[100vh]">
        {/***********enquiry page content************/}
      </div>
      <Footer />
    </div>
  )
}

export default EnquiryPage