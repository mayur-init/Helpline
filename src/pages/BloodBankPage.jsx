import React, {useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import BloodBankHero from '../components/Heroes/BloodBankHero'
import Navbar from '../components/Navbar'
import { globalStateContext } from '../contexts/globalStateContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function BloodBankPage() {

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
            <BloodBankHero />
            <Footer />
        </div>
    )
}

export default BloodBankPage
