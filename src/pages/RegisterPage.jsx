import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HospitalRegister from '../components/HospitalRegister';
import AmbulanceServiceRegister from '../components/AmbulanceServiceRegister';

function RegisterPage() {
  
  let [isActive, setIsActive] = useState(true);

  return (
    <div className='flex bg-gray-200  flex-col justify-evenly'>
      <Navbar />
      <div className='bg-white w-full h-[65vh]'>
        <div className='w-[80vw] flex justify-center m-auto'>
          <div className='flex flex-col justify-center items-center m-auto'>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600 hover:scale-110'>By registering your service</p>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600 hover:scale-110'>your can help us to reach </p>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600 hover:scale-110'>to more needful</p>
          </div>
          <img src='assets/img7.webp' className='w-[40vw] h-[65vh]'></img>
        </div>
      </div>
      <div className='min-h-[90vh] p-4 flex flex-col items-center'>

        <div className='h-[20vh] w-full py-2 flex justify-end items-center'>
          <h1 className='text-4xl font-medium mx-[20vw] hover:text-violet-600'>Register your services</h1>
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