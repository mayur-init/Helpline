import React from 'react'
import Footer from '../components/Footer'
import BloodBankHero from '../components/Heroes/BloodBankHero'
import Navbar from '../components/Navbar'
function BloodBankPage() {
    return (
        <div className='bg-zinc-200' id='main'>
            <Navbar/>
            <BloodBankHero />
            <div className="w-full h-[100vh]">
                {/***********blood bank page content************/}
            </div>
            <Footer/>
        </div>
    )
}

export default BloodBankPage
