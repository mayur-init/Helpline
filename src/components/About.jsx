import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const About = () => {
    return (
        <div className='w-full flex items-center' id='services'>
            <div className='w-[80vw] m-auto'>

                <h2 className='text-5xl font-bold flex justify-center my-[6vh] hover:text-violet-600'>Our Services</h2>
                
                {/***************card-box*************/}
                <div className='grid md:grid-cols-3 gap-4 text-center my-[15vh] mx-8'>
                    {/********cards*********/}

                    <HashLink smooth to={'/ambulance-service#main'}>
                    {/**********Ambulance Service************/}
                    <div className='border min-h-[54vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                        <img className='w-[80vw] h-[28vh]' src={'assets/img4.webp'} alt="/" />
                        <p className='text-3xl font-bold m-6'>Ambulance Service</p>
                        <p className='text-black-400 '>Basic Life Support Ambulance is for the patients who need medical transportation. It comprises of patient bed, pulse oximetry and oxygen delivery devices.</p>
                    </div>
                    </HashLink>

                    <HashLink smooth to={'/blood-bank-service#main'}>
                    {/******************Blood Bank Service************************/}
                    <div className='border min-h-[54vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                        <img className='w-[80vw] h-[28vh]' src={'assets/blood_bank.jpg'} alt="/" />
                        <p className='text-3xl font-bold p-6'>Blood Bank Service</p>
                        <p className='text-black-400 mt-2'>ALS ambulance is equipped with ventilator, ECG, monitoring devices and paramedic staff.</p>
                    </div>
                    </HashLink>

                    <HashLink smooth to={'oxygen-cylinder-service#main'}>
                    {/***********************Oxygen Cylinder Service*****************************/}
                    <div className='border min-h-[54vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105' >
                        <img className='w-full h-[28vh]' src={'assets/Oxygen_cylinder.jpg'} alt="/" />
                        <p className='text-3xl font-bold p-6'>Oxygen Cylenders Service</p>
                        <p className='text-black-400 mt-2'>Mortuary ambulance services are used for the transportation of the dead body</p>
                    </div>
                    </HashLink>
                </div>

                {/*********************How it works****************************/}
                <div className='bg-white grid grid-cols-2 shadow-2xl text-center mt-[10vh] p-7 mx-[2.4vw] mb-[6vh] rounded-xl'>
                    <div className='py-4' >
                        <img className='w-[32vw] h-[50vh]' src={'assets/img2.webp'} alt="/" />
                    </div>
                    <div className='h-[30vh] px-8' >
                        <h1 className='text-2xl md:text-4xl font-bold mx-5 text-start hover:text-violet-600'>How It Works?</h1>
                        <div className='text-gray-500 font-semibold'>
                            <div className='flex'>
                                <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>1</span>
                                <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Add your location</p>
                            </div>
                            <div className='flex'>
                                <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>2</span>
                                <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Choose Nearest Ambulance</p>
                            </div>
                            <div className='flex'>
                                <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>3</span>
                                <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Book an Ambulance Easily</p>
                            </div>
                            <div className='flex'>
                                <span className='m-4 ml-3 w-12 h-12 p-1 bg-slate-300 text-sky-800 rounded-full text-4xl hover:bg-sky-800 hover:text-slate-400'>4</span>
                                <p className='text-2xl m-4 ml-4 hover:text-violet-600'>Track your Ambulance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About