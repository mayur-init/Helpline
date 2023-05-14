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
      url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
      params: {
        latitude: location.lattitude,
        longitude: location.longitude,
        range: '0'
      },
      headers: {
        'X-RapidAPI-Key': 'f68ef52b0emsh22a1008ad86b649p11f343jsn9561ac66dfa1',
        'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
      }
    };

    try {
      await generateRegdId();
      const response = await axios.request(options);
      // console.log(response);

      UserData.Location = response.data[0].City;

      const registerResponse = await axios.post('http://localhost:5000/api/user', UserData, {
      headers:{
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      });

      // console.log(UserData);
      // console.log("sent");
      // console.log(registerResponse.data);

      //storing access and refresh tokens in localstorage
      localStorage.setItem('helpline_access_token', registerResponse.data.access_token);
      localStorage.setItem('helpline_refresh_token', registerResponse.data.refresh_token);

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
  const handleChange = (e) => {
    const { value } = e.target;
    if (!isNaN(value)) {
      setContactNo(value);
    } else {
      toast.error('Enter number only');
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center items-center w-full my-[4vh]'>
        <input type='text' onChange={(e) => { setUserName(e.target.value) }} placeholder='Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'></input>
        <input type='text' onChange={handleChange} placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'></input>
        <p className='border-2 text-start border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'>{location.lattitude}</p>
        <p className='border-2 text-start border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'>{location.longitude}</p>
        <p className='flex md:justify-end ml-[14.5vh] md:ml-0 md:w-[20.8vw]'><button onClick={util} className='btn w-[100px] m-2'>Submit</button></p>
      </div>
    </div>
  )
}

export default UserRegister