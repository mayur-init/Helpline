import React from 'react'
import Footer from '../components/Footer'
import BloodBankHero from '../components/Heroes/BloodBankHero'
import Navbar from '../components/Navbar'
function BloodBankPage() {
    return (
        <div className='bg-zinc-200' id='main'>
            <Navbar/>
            <BloodBankHero />
            <Footer/>
        </div>
    )
}

export default BloodBankPage
