import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { globalStateContext } from '../../contexts/globalStateContext'
import { useNavigate } from 'react-router-dom';


function UserRegister({ location, setLocation }) {

  const [UserContactNumber, setUserContactNumber] = useState('');
  const { userName, setUserName, setUserLoggedIn } = useContext(globalStateContext);
  const navigate = useNavigate()

  const util = async () => {

    const UserData = {
      Name: userName,
      ContactNumber: UserContactNumber,
      lattitude: location.lattitude,
      longitude: location.longitude,
    }

    console.log(UserData);

    try {
      const response = await axios.post('http://localhost:5000/api/user', UserData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      });
      console.log("sent");
    } catch (error) {
      console.log(error);
    }

    if (userName === '' || UserContactNumber === '') {
      toast.error('Username or Contact is empty')
    } else {
      setUserName('');
      setUserContactNumber('');
      setLocation(null);

      setUserName(userName);
      setUserLoggedIn(true);
      toast.success(`Welcome ${userName}`)
      navigate('/#hero', { replace: true });
    }
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center items-center w-full my-[8vh]'>
        <input type='text' onChange={(e) => { setUserName(e.target.value) }} placeholder='Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'></input>
        <input type='text' onChange={(e) => { setUserContactNumber(e.target.value) }} placeholder='Contact Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'></input>
        <p className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'>{location.lattitude}</p>
        <p className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'>{location.longitude}</p>
        <p className='flex justify-end w-[20.8vw]'><button onClick={util} className='btn w-[100px] m-2'>Submit</button></p>
      </div>
    </div>
  )
}

export default UserRegister