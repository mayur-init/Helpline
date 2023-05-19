import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { globalStateContext } from '../../contexts/globalStateContext'
import { useNavigate } from 'react-router-dom';


function UserRegister({ location, setLocation }) {

  const [contactNo, setContactNo] = useState('');
  var { userName, setUserName, userId, setUserId, setUserLoggedIn } = useContext(globalStateContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  // var RegdId = useRef();

  const UserData = {
    UserName: name,
    ContactNo: contactNo,
    RegdId: userId,
    Location
  }

  const options = {
    method: 'GET',
    url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
    params: {
      latitude: location.lattitude,
      longitude: location.longitude,
      range: '0'
    },
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
    }
  };


  const verifyUserRegister = async () => {
    if (name === '' || contactNo === '')
      toast.error('Username or Contact is empty');

    else {
      const user_refresh_token = localStorage.getItem('helpline_refresh_token');

      if (user_refresh_token !== null) {
        toast.error('You are already registered, you can login now');
        navigate('/login', { replace: true });
      }
      else {
        try {
          //getting user location
          const response = await axios.request(options);
          UserData.Location = response.data[0].City;
          //console.log(response);

          //generating useId
          await generateRegdId();
          // console.log(userId);

          //adding user to database by sending data to the server
          const registerResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user`, UserData, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            }
          });

          //storing access and refresh tokens in localstorage
          localStorage.setItem('helpline_access_token', registerResponse.data.access_token);
          localStorage.setItem('helpline_refresh_token', registerResponse.data.refresh_token)

          //make user login in ui
          setUserName('');
          setContactNo('');
          setLocation(null);

          setUserName(name);
          setUserLoggedIn(true);
          toast.success(`Welcome ${name}`);
          navigate('/#hero', { replace: true });
          
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  const generateRegdId = async () => {
    // console.log("generating id");
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/generateregdid`, { IdType: 'USER' });
    // console.log(response);
    setUserId(response.data.generatedId);
    UserData.RegdId = response.data.generatedId;
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
        <input type='text' onChange={(e) => { setName(e.target.value) }} placeholder='Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'></input>
        <input type='text' onChange={handleChange} value={contactNo} placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'></input>
        <p className='border-2 text-start border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'>{location.lattitude}</p>
        <p className='border-2 text-start border-gray-600 rounded-full px-4 py-1 my-2 w-[60vw] md:w-[20vw]'>{location.longitude}</p>
        <p className='flex md:justify-end ml-[14.5vh] md:ml-0 md:w-[20.8vw]'><button onClick={() => { verifyUserRegister() }} className='btn w-[100px] m-2'>Submit</button></p>
      </div>
    </div>
  )
}

export default UserRegister