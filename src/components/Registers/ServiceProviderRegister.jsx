import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import RegisterFormDropdown from '../Dropdowns/RegisterFormDropdown';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { globalStateContext } from '../../contexts/globalStateContext'

function ServiceProviderRegister() {

  const options = [
    { label: 'Hospital Service', id: 1 },
    { label: 'Ambulance Service Provider', id: 2 },
    { label: 'Blood Bank Service Provider', id: 3 },
    { label: 'Oxygen Cylinder Provider', id: 4 }
  ]

  const [formNo, setFromNo] = useState(0);

  const [ServiceProviderName, setServiceProviderName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Password, setPassword] = useState('');

  var RegdId = useRef('');
  const [ParentRegdId, setParentRegdId] = useState(null);

  const { isProviderLoggedIn, setProviderLoggedIn } = useContext(globalStateContext);
  const navigate = useNavigate();

  const Data = {
    ServiceProviderName,
    ContactNo,
    Email,
    RegdId,
    ParentRegdId,
    Address,
    Password,
  }

  const util = async () => {

    if (ServiceProviderName === '' || Email === '' || ContactNo === '' || Address === '' || Password === '') {
      toast.error('Some fields are empty, fill them all');
    } else {

      if (formNo === 1) {
        try {
          await generateRegdId();
          //send hospital register data in db

        } catch (error) {
          console.log(error);
        }

      } else if (formNo === 2) {
        try {
          await generateRegdId();
          const response = await axios.post('http://localhost:5000/api/ambulance', Data, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            }
          });
          console.log("Data sent");
        } catch (error) {
          console.log(error);
        }
      } else if (formNo === 3) {
        try {
          await generateRegdId();
          const response = await axios.post('http://localhost:5000/api/bloodbank', Data, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            }
          });
          console.log("Data sent");
        } catch (error) {
          console.log(error);
        }
      } else if (formNo === 4) {
        try {
          await generateRegdId();
          const response = await axios.post('http://localhost:5000/api/oxygencylinder', Data, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            }
          });
          // console.log("Data sent");
        } catch (error) {
          console.log(error);
        }
      }

      // console.log(Data);

      setServiceProviderName('');
      setContactNo('');
      setEmail('');
      setAddress('');
      setPassword('');

      //set provider logged in
      setProviderLoggedIn(true);

      toast.success(`Welcome ${ServiceProviderName}`);

      if (formNo === 1) {
        navigate(`/hospital-service-panel/${ServiceProviderName}`, { replace: true });
      } else if (formNo === 2) {
        navigate(`/ambulance-service-provider-panel/${ServiceProviderName}`, { replace: true });
      } else if (formNo === 3) {
        navigate(`/blood-bank-service-provider-panel/${ServiceProviderName}`, { replace: true });
      } else if (formNo === 4) {
        navigate(`/oxygen-cylinder-provider-panel/${ServiceProviderName}`, { replace: true });
      }
    }
  }

  useEffect(() => {
    setProviderLoggedIn(false);
  })

  const generateRegdId = async () => {
    setParentRegdId(null);
    var random = await Math.random().toString().substring(2, 8);
    // console.log(random);

    if(formNo === 1){
      RegdId = `HOSP${random}`;

    }else if(formNo === 2){
      RegdId = `AMBU${random}`;

    }else if(formNo === 3){
      RegdId = `BLOOD${random}`;

    }else if(formNo === 4){
      RegdId = `OXYG${random}`;

    }
    Data.RegdId = RegdId;
  }

  return (
    <div className='rounded-xl shadow-xl p-4 min-h-max'>
      <h1 className='text-gray-600 text-3xl font-bold my-[4vh] flex justify-center hover:text-violet-600'>Register Service</h1>
      <div className='flex flex-col w-[50vh] h-auto mt-[8vh] mb-[2vh]'>
        <RegisterFormDropdown title={'Register as'} options={options} setFromNo={setFromNo} />
        <input type='text' onChange={(e) => { setServiceProviderName(e.target.value) }} value={ServiceProviderName} placeholder='Service Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setContactNo(e.target.value) }} value={ContactNo} placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setEmail(e.target.value) }} value={Email} placeholder='Email' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setAddress(e.target.value) }} value={Address} placeholder='Permanent Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setPassword(e.target.value) }} value={Password} placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <p className='flex justify-end'><button onClick={() => { util() }} className='btn w-[100px] m-2'>Submit</button></p>
      </div>
    </div>
  )
}

export default ServiceProviderRegister
