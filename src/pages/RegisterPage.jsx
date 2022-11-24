import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HospitalRegister from '../components/HospitalRegister';
import AmbulanceRegister from '../components/AmbulanceRegister';

function RegisterPage() {
  
  let [isActive, setIsActive] = useState(true);

  return (
    <div className='bg-gray-200 flex flex-col justify-evenly'>
      <Navbar />
      <div className='min-h-[90vh] p-4 flex flex-col items-center'>
        <h1 className='text-3xl font-medium text-gray-600 flex justify-center m-[4vh]'>Register your services</h1>
        <div className='flex'>
          <button className='btn mx-2' onClick={() => setIsActive(true)}>Hospital service</button>
          <button className='btn mx-2' onClick={() => setIsActive(false)}>Ambulance service</button>
        </div>
        <div className='flex mt-[8vh]'>
          {isActive? (<HospitalRegister/>):(<AmbulanceRegister/>)}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RegisterPage