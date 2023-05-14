import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Services = () => {
    return (
        <div className='w-full flex items-center' id='services'>
            <div className='w-screen m-auto'>

                <h2 className='text-5xl font-bold flex justify-center my-[6vh] hover:text-violet-600'>Our Services</h2>

                {/***************card-box*************/}
                <div className='grid place-content-center '>
                    <div className='grid md:grid-cols-3 gap-4 w-[75vw] mx-auto text-center md: my-[6vh]'>
                        {/********cards*********/}

                        <HashLink smooth to={'/ambulance-service#main'}>
                            {/**********Ambulance Service************/}
                            <div className='border md:w-[22vw] h-auto bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                                <img className='w-[80vw] h-[28vh]' src={'assets/img4.webp'} alt="/" />
                                <p className='text-3xl font-semibold m-7'>Ambulance Service</p>
                                <p className='text-black-400 '></p>
                            </div>
                        </HashLink>

                        <HashLink smooth to={'/blood-bank-service#main'}>
                            {/******************Blood Bank Service************************/}
                            <div className='border md:w-[22vw] h-auto bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                                <img className='w-[80vw] h-[28vh]' src={'assets/blood_bank.jpg'} alt="/" />
                                <p className='text-3xl font-semibold p-6'>Blood Bank Service</p>
                                <p className='text-black-400 mt-2'></p>
                            </div>
                        </HashLink>

                        <HashLink smooth to={'oxygen-cylinder-service#main'}>
                            {/***********************Oxygen Cylinder Service*****************************/}
                            <div className='border md:w-[22vw] h-auto bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                                <img className='w-full h-[28vh]' src={'assets/Oxygen_cylinder.jpg'} alt="/" />
                                <p className='text-3xl font-semibold p-6'>Oxygen Cylenders Service</p>
                                <p className='text-black-400 mt-2'></p>
                            </div>
                        </HashLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services