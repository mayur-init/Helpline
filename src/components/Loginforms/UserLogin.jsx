import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { globalStateContext } from '../../contexts/globalStateContext'
import { toast } from 'react-hot-toast';
import { HashLink } from 'react-router-hash-link';


function UserLogin({ }) {

  const navigate = useNavigate();
  const { userName, setUserName, userId, setUserId, setUserLoggedIn } = useContext(globalStateContext);

  //state management for user 
  const [contactNo, setContactNo] = useState('');
  const [otp, setOtp] = useState('');

  const handleClick = () => {
    // check if user is logged in or not
    if (userName === '' || contactNo === '' || otp === '') {
      toast.error('Username, Contact or OTP is empty')
    } else {
      setUserLoggedIn(true);
      setUserName(userName);
      toast.success(`Welcome ${userName}`)
      navigate('/#hero', { replace: true });
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='w-auto h-[52vh] mb-[8vh] p-4 text-center bg-white rounded-xl'>
        <p className='text-3xl font-bold text-gray-600 my-[4vh] flex justify-center hover:text-violet-600'>User Login</p>
        <div className='flex flex-col w-[50vh] h-auto mt-[8vh] mb-[4vh]'>
          <input type='text' placeholder='Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setUserName(e.target.value) }}></input>
          <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setContactNo(e.target.value) }}></input>
          <input type='text' placeholder='One Time Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setOtp(e.target.value) }}></input>
          <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleClick}>Submit</button></p>
          <p className='flex justify-start text-sm'>Haven't registered yet?<HashLink smooth to='/#userRegister ' className='hover:text-violet-600 mx-2'>Register Now</HashLink></p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin