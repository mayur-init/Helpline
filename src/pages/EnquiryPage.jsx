import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import EnquiryHero from '../components/Heroes/EnquiryHero'

function EnquiryPage() {
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