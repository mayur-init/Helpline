import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RegisterPageHero from '../components/Heroes/RegisterPageHero';
import BloodBankRegister from '../components/Registers/BloodBankRegister';
import AmbulanceServiceRegister from '../components/Registers/AmbulanceServiceRegister';
import OxygenCylinderRegister from '../components//Registers/OxygenCylinderRegister';
import ServiceRegisterForm from '../components/Registers/AmbulanceServiceRegister';

function RegisterPage() {
  
  // let [register, setRegister] = useState(1);

  return (
    <div className='flex bg-gray-200  flex-col justify-evenly'>
      <Navbar />
      <div className='bg-white w-full h-[100vh] '>
        <RegisterPageHero/>
      </div>
      <div className='min-h-[90vh] p-4 flex flex-col items-center' id='registerForm'>

        <div className='h-[20vh] w-full flex justify-end items-center'>
          <h1 className='text-4xl font-medium m-auto hover:text-violet-600'>Register your service</h1>
          <div className='flex'>
            {/* <button className='btn mx-2' onClick={() => setRegister(1)}>Ambulance Service</button>
            <button className='btn mx-2' onClick={() => setRegister(2)}>Blood Bank Service</button>
            <button className='btn mx-2' onClick={() => setRegister(3)}>Oxygen Cylinder Service</button> */}
            
          </div>
        </div>
        
        <div className='flex mt-[4vh] bg-white rounded-xl'>
          <ServiceRegisterForm/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RegisterPage