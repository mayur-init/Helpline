import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Services = () => {
    return (
        <div className='w-full flex items-center' id='services'>
            <div className='w-[80vw] m-auto'>

                <h2 className='text-5xl font-bold flex justify-center my-[8vh] hover:text-violet-600'>Our Services</h2>
                
                {/***************card-box*************/}
                <div className='grid md:grid-cols-3 gap-4 text-center my-[10vh] mx-8'>
                    {/********cards*********/}

                    <HashLink smooth to={'/ambulance-service#main'}>
                    {/**********Ambulance Service************/}
                    <div className='border h-[64vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                        <img className='w-[80vw] h-[28vh]' src={'assets/img4.webp'} alt="/" />
                        <p className='text-3xl font-bold m-6'>Ambulance Service</p>
                        <p className='text-black-400 '>Basic Life Support Ambulance is for the patients who need medical transportation. It comprises of patient bed, pulse oximetry and oxygen delivery devices.</p>
                    </div>
                    </HashLink>

                    <HashLink smooth to={'/blood-bank-service#main'}>
                    {/******************Blood Bank Service************************/}
                    <div className='border h-[64vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                        <img className='w-[80vw] h-[28vh]' src={'assets/blood_bank.jpg'} alt="/" />
                        <p className='text-3xl font-bold p-6'>Blood Bank Service</p>
                        <p className='text-black-400 mt-2'>ALS ambulance is equipped with ventilator, ECG, monitoring devices and paramedic staff.</p>
                    </div>
                    </HashLink>

                    <HashLink smooth to={'oxygen-cylinder-service#main'}>
                    {/***********************Oxygen Cylinder Service*****************************/}
                    <div className='border h-[64vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                        <img className='w-full h-[28vh]' src={'assets/Oxygen_cylinder.jpg'} alt="/" />
                        <p className='text-3xl font-bold p-6'>Oxygen Cylenders Service</p>
                        <p className='text-black-400 mt-2'>Mortuary ambulance services are used for the transportation of the dead body</p>
                    </div>
                    </HashLink>
                </div>
            </div>
        </div>
    )
}

export default Services