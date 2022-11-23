import React from 'react'

const About = () => {
  return (
    <div  className='w-full my-32'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Our Services</h2>
            </div>

            <div className='grid md:grid-cols-3 gap-2 px-2 text-center'>
                <div className='border py-4 rounded-xl shadow-xl' >
                    <img className='w-full' src={'assets/basic.png'} alt="/" />
                    <p className='text-3xl font-bold'>Basic Ambulance</p> 
                    <p className='text-black-400 '>Basic Life Support Ambulance is for the patients who need medical transportation. It comprises of patient bed, pulse oximetry and oxygen delivery devices.</p>
                </div>
                <div  className='border py-8 rounded-xl shadow-xl' >
                    <img className='w-full' src={'assets/Advance.png'} alt="/" />
                    <p className='text-3xl font-bold'>Advance Ambulance</p> 
                    <p className='text-black-400 mt-2'>ALS ambulance is equipped with ventilator, ECG, monitoring devices and paramedic staff.</p>
                </div>
                <div className='border py-8 rounded-xl shadow-xl' >
                <img className='w-full' src={'assets/Mortuary.png'} alt="/" />
                <p className='text-3xl font-bold'>Mortuary Ambulance</p> 
                    <p className='text-black-400 mt-2'>Mortuary ambulance services are used for the transportation of the dead body</p>
                </div>
            </div>

            <div className='grid grid-cols-2 my-4 md:grid-cols-2 gap-2 px-1 text-center'>
                <div className='border py-4 rounded-xl' >
                    <img className='w-[85%]' src={'assets/work.png'} alt="/" />  
                </div>
                <div  className='border py-8 rounded-xl' >
                   <h1 className='text-2xl md:text-6xl font-bold'>How It Works?</h1>
                   <p className='my-3 text-lg'>Book an Ambulance or Emergency Service Anytime, Anywhere.</p>
                            
               
                   <p className='text-3xl'>Choose Your Ambulance</p>
                   
                   <p className='text-3xl'>Find Nearest Ambulance</p>
                   
                   <p className='text-3xl'>Get an Ambulance</p>
                  
                   <p className='text-3xl'>Track your Ambulance</p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default About