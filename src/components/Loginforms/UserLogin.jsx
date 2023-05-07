import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { globalStateContext } from '../../contexts/globalStateContext'
import { toast } from 'react-hot-toast';
import { HashLink } from 'react-router-hash-link';


function UserLogin({ }) {

  const navigate = useNavigate();
  const { userName, setUserName, userId, setUserId, setUserLoggedIn } = useContext(globalStateContext);

  //state management for user 
  const [contactNo, setContactNo] = useState('');
  const [otp, setOtp] = useState('');

  const handleClick = async () => {
    //getting user refresh_token from localstorage
    const user_refresh_token = localStorage.getItem('helpline_refresh_token');

    if (user_refresh_token === null) {
      toast.error("You are not registered, registere yourself first");

    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/verifyrefreshtoken', {
          RefreshToken: user_refresh_token,
        });

        const UserData = res.data;
        localStorage.setItem('helpline_access_token', UserData.accessToken);
        setUserName(UserData.userName);
        setUserId(UserData.regdId);
        setUserLoggedIn(true);
        toast.success(`Welcome ${UserData.userName}`);
        navigate('/#hero', { replace: true });
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleChange = (e) => {
    const { value } = e.target;
    if (!isNaN(value)) {
      setContactNo(value);
    } else {
      toast.error('Enter number only');
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-auto h-[40vh] mb-[8vh] p-4 text-center bg-white rounded-xl'>
        <p className='text-3xl font-bold text-gray-600 my-[4vh] flex justify-center hover:text-violet-600'>User Login</p>
        <div className='flex flex-col w-[40vh] h-auto mt-[8vh] mb-[4vh]'>
          <p className='text-xl font-bold text-gray-600 flex justify-center' >Already have an account</p>
          {/* <input type='text' placeholder='Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setUserName(e.target.value) }}></input> */}
          {/* <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={handleChange}></input> */}
          {/* <input type='text' placeholder='One Time Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setOtp(e.target.value) }}></input> */}
          <p className='flex justify-end'><button className='btn w-[100px] mx-[2vw] my-2' onClick={handleClick}>Login</button></p>
          <p className='flex justify-center text-sm mt-8'>Haven't registered yet?<HashLink smooth to='/#userRegister ' className='hover:text-violet-600 mx-2'>Register Now</HashLink></p>
        </div>
      </div>
    </div>
  )
}

export default UserLogin