import React, {useContext, useEffect } from 'react'
import Footer from '../components/Footer'
import BloodBankHero from '../components/Heroes/BloodBankHero'
import Navbar from '../components/Navbar'
import { globalStateContext } from '../contexts/globalStateContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function BloodBankPage() {

    const navigate = useNavigate();

    const { isUserLoggedIn } = useContext(globalStateContext);
    useEffect(() => {
        if (!isUserLoggedIn) {
            toast.error('You are not logged in, log in first')
            navigate('/login#loginForm', { replace: true });
        }
        
    });

    return (
        <motion.div className='bg-zinc-200' id='main'
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}}>
            <Navbar />
            <BloodBankHero />
            <Footer />
        </motion.div>
    )
}

export default BloodBankPage
