import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserLogin from '../components/Loginforms/UserLogin'
import ServiceProviderLogin from '../components/Loginforms/ServiceProviderLogin'

function LoginPage() {

  const [form, setform] = useState(1);

  return (
    <div className='bg-gray-200'>
      <Navbar />
      <div className='h-[100vh] bg-white flex justify-between'>
        <div className=' w-auto h-auto m-auto flex justify-center items-center'>
          <div className='flex flex-col justify-center items-center m-8'>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600'>By Loging in as</p>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600'>a member, your can help</p>
            <p className='text-4xl font-bold self-center w-[30vw] p-2  hover:text-violet-600'>in this noble project</p>
          </div>
        </div>
        <div className='my-[18vh] mr-[10vh]'>
          <img src='assets/loginPage.jpg' className='w-[45vw] h-[60vh]' />
        </div>
      </div>
      <div className='my-[8.5vh] mx-[2vh]'>
        <div className='flex justify-end'>
          <h1 className='text-4xl font-medium self-center mr-[25vw] hover:text-violet-600' id='loginForm'>Login as a member</h1>
          <button className='btn my-4 mx-2' onClick={() => { setform(1) }}>User</button>
          <button className='btn my-4 mx-2' onClick={() => { setform(2) }}>Service Provider</button>
          {/* <button className='btn my-4 mx-2' onClick={() => { setform(3) }}>Blood Bank Serivce</button>
          <button className='btn my-4 mx-2' onClick={() => { setform(4) }}>Oxygen Serivce</button> */}
          {/* <button className='btn m-4'>User</button> */}
        </div>
      </div>
      <div className='mb-[6vh]'>
        {
          form === 1 ? <UserLogin />: <ServiceProviderLogin />
        }
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage