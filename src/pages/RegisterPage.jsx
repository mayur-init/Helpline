import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HospitalRegister from '../components/HospitalRegister';
import AmbulanceServiceRegister from '../components/AmbulanceServiceRegister';
import RegisterPageHero from '../components/Heroes/RegisterPageHero';

function RegisterPage() {
  
  let [isActive, setIsActive] = useState(true);

  return (
    <div className='flex bg-gray-200  flex-col justify-evenly'>
      <Navbar />
      <div className='bg-white w-full h-[100vh] '>
        <RegisterPageHero/>
      </div>
      <div className='min-h-[90vh] p-4 flex flex-col items-center'>

        <div className='h-[20vh] w-full flex justify-end items-center'>
          <h1 className='text-4xl font-medium mr-[19.8vw] hover:text-violet-600'>Register your services</h1>
          <div className='flex'>
            <button className='btn mx-2' onClick={() => setIsActive(true)}>Hospital service</button>
            <button className='btn mx-2' onClick={() => setIsActive(false)}>Ambulance service</button>
          </div>
        </div>
        
        <div className='flex mt-[4vh] bg-white rounded-xl'>
          {isActive? (<HospitalRegister/>):(<AmbulanceServiceRegister/>)}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RegisterPage