import React, { useState, useContext,useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { globalStateContext } from '../../contexts/globalStateContext'
import { useNavigate } from 'react-router-dom';


function UserRegister({ location, setLocation }) {
  var RegdId = useRef('');
  var Location = useRef('');
  const [UserContactNumber, setUserContactNumber] = useState('');
  const { userName, setUserName, setUserLoggedIn } = useContext(globalStateContext);
  const navigate = useNavigate();
  const UserData = {
    userName,
    UserContactNumber,
    RegdId,
    Location,
  }
  const util = async (e) => {
    e.preventDefault();
    const options = {
      method: 'GET',
      url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
      params: {
        latitude: location.lattitude,
        longitude: location.longitude,
        range: '0'
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'f68ef52b0emsh22a1008ad86b649p11f343jsn9561ac66dfa1',
        'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
      }
    };

    try {
      await generateRegdId();
      const response = await axios.request(options);
      UserData.Location = response.data[0].City;
      const registerResponse = await axios.post('http://localhost:5000/api/user', UserData, {
      headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      });
      console.log("sent");
      console.log(registerResponse);
     
    } catch (error) {
      console.log(error);
      console.log(UserData.Location);
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
  const generateRegdId = async () => {
    var random = await Math.random().toString().substring(2, 8);
    UserData.RegdId = `USER${random}`;
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