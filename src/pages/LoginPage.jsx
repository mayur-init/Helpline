import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLogin from '../components/Loginforms/UserLogin'
import AmbulanceServiceLogin from '../components/Loginforms/AmbulaceServiceLogin'
import BloodBankLogin from '../components/Loginforms/BloodBankLogin'

function LoginPage() {

  const [form, setform] = useState(1);

  return (
    <div className='bg-gray-200'>
      <Navbar />
      <div className='h-[100vh] bg-white flex justify-between'>
        <div className=' w-auto h-auto m-auto flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center m-8'>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600 hover:scale-110'>By Loging in yourself as</p>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600 hover:scale-110'>a member, your can join us in</p>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600 hover:scale-110'>this noble project</p>
          </div>
        </div>
        <div className='my-[18vh] mr-[10vh]'>
          <img src='assets/loginPage.jpg' className='w-[45vw] h-[60vh]' />
        </div>
      </div>
      <div className='my-[8.5vh] mx-[2vh]'>
        <div className='flex justify-end'>
          <h1 className='text-4xl font-medium self-center mr-[10vw] hover:text-violet-600'>Login yourself as</h1>
          <button className='btn my-4 mx-2' onClick={() => { setform(1) }}>User</button>
          <button className='btn my-4 mx-2' onClick={() => { setform(2) }}>Ambulace Service Provider</button>
          <button className='btn my-4 mx-2' onClick={() => { setform(3) }}>Blood Bank Serivce Provider</button>
          {/* <button className='btn m-4'>User</button> */}
        </div>
      </div>
      <div>
        {
          form === 1 ? <UserLogin /> : (form === 2 ? <AmbulanceServiceLogin /> : <BloodBankLogin />)
        }
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage