import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { globalStateContext } from '../../contexts/globalStateContext'
import { useNavigate } from 'react-router-dom';


function UserRegister({ location, setLocation }) {
  
  const [contactNo, setContactNo] = useState('');
  var { userName, setUserName, userId, setUserId, setUserLoggedIn } = useContext(globalStateContext);
  const navigate = useNavigate();
  // var RegdId = useRef();

  const UserData = {
    UserName: userName,
    ContactNo: contactNo ,
    RegdId: userId,
    Location
  }

  const util = async (e) => {

    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse',
      params: {
        lat: location.lattitude,
        lon: location.longitude,
        'accept-language': 'en',
        polygon_threshold: '0.0'
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'b0e520ee8fmshcab43f4f751636dp1176dbjsn85454dfddf6a',
        'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
      }
    };

    try {
      await generateRegdId();
      const response = await axios.request(options);
      // console.log(response);

      UserData.Location = response.data.address.city;

      const registerResponse = await axios.post('http://localhost:5000/api/user', UserData, {
      headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      });

      // console.log(UserData);
      // console.log("sent");
      // console.log(registerResponse.data);

    } catch (error) {
      console.log(error);
      // console.log(UserData.Location);
    }

    if (userName === '' || contactNo === '') {
      toast.error('Username or Contact is empty')
    } else {
      setUserName('');
      setContactNo('');
      setLocation(null);

      setUserName(userName);
      setUserLoggedIn(true);
      toast.success(`Welcome ${userName}`);
      navigate('/#hero', { replace: true });
    }
  }

  const generateRegdId = async () => {
    const response = await axios.post('http://localhost:5000/api/generateregdid', {IdType: 'USER'});
    // console.log(response);
    setUserId(response.data.generatedId);
    // console.log(userId);
    UserData.RegdId = response.data.generatedId;
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center items-center w-full my-[8vh]'>
        <input type='text' onChange={(e) => { setUserName(e.target.value) }} placeholder='Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'></input>
        <input type='text' onChange={(e) => { setContactNo(e.target.value) }} placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'></input>
        <p className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'>{location.lattitude}</p>
        <p className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[20vw]'>{location.longitude}</p>
        <p className='flex justify-end w-[20.8vw]'><button onClick={util} className='btn w-[100px] m-2'>Submit</button></p>
      </div>
    </div>
  )
}

export default UserRegister