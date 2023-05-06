import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import LoginFormDropdown from '../Dropdowns/LoginFormDropdown'
import { HashLink } from 'react-router-hash-link'
import toast from 'react-hot-toast'
import { globalStateContext } from '../../contexts/globalStateContext'


function ServiceProviderLogin() {

  const options = [
    {label: 'Hospital Service', id: 1},
    { label: 'Ambulance Service Provider', id: 2},
    { label: 'Blood Bank Service Provider', id: 3 },
    { label: 'Oxygen Cylinder Provider', id: 4 }
  ]

  const [formNo, setFromNo] = useState(0);
  const navigate = useNavigate();
  // state management for ambulance service provider
  const [ServiceProviderName, setServiceProviderName] = useState('');
  const [RegdId, setRegdId] = useState('');
  const [Password, setPassword] = useState('');
  const { isProviderLoggedIn, setProviderLoggedIn } = useContext(globalStateContext);

  var ProviderType = useRef('');
  var redirectUrl = useRef('');
  var providerData = null; 

  const Data = {
    RegdId,
    Password,
    ProviderType,
  }

  const handleClick = async () => {

    if (RegdId === '' || Password === '') {
      toast.error('All fields are mendatory');
    } else {

      setProviderLoggedIn(true);
      // toast.success(`Welcome ${ServiceProviderName}`);

      if(formNo === 1){
        Data.ProviderType = 'HOSP';
        redirectUrl = `/hospital-service-panel/${RegdId.toLowerCase()}`;
        providerData = await axios.get(`http://localhost:5000/api/hospital/${RegdId}`);

      } else if (formNo === 2) {
        Data.ProviderType = 'AMBU';
        redirectUrl = `/ambulance-service-provider-panel/${RegdId.toLowerCase()}`;
        providerData = await axios.get(`http://localhost:5000/api/ambulanceservice/${RegdId}`);
        
      } else if (formNo === 3) {
        Data.ProviderType = 'BLOOD';
        redirectUrl = `/blood-bank-service-provider-panel/${RegdId.toLowerCase()}`;
        providerData = await axios.get(`http://localhost:5000/api/bloodbanks/${RegdId}`);

      } else if (formNo === 4) {
        Data.ProviderType = 'OXYG';
        redirectUrl = `/oxygen-cylinder-provider-panel/${RegdId.toLowerCase()}`;
        providerData = await axios.get(`http://localhost:5000/api/oxygencylinderproviders/${RegdId}`);

      }
      
      // console.log(Data);
      //verifying service provider
      const res = await isVerified();
      // console.log(res);

      if(res.registered === false){
        toast.error('You have not registered yet, register yourself first');
      }
      else if(res.verified === false){
        toast.error('UserName or Password incorrect');
      }
      
      if(res.registered === true && res.verified === true){
        setProviderLoggedIn(true);
        if(providerData !== null){
          toast.success(`Welcome ${providerData.data[0].providerName}`);
        }
        navigate( redirectUrl , {replace: true});
      }
    }
  }

  useEffect(() => {
    setProviderLoggedIn(false);
  });

  const isVerified = async () =>{
    try {
      const res = await axios.post('http://localhost:5000/api/providerlogin', Data);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='w-auto h-[52vh] mb-[8vh] p-4 text-center bg-white rounded-xl'>
          <p className='text-3xl font-bold text-gray-600 my-[4vh] flex justify-center hover:text-violet-600'>Service Provider Login</p>
          <div className='flex flex-col w-[50vh] h-auto mt-[8vh] mb-[4vh]'>
            <LoginFormDropdown title={'Login as'} options={options} setFromNo={setFromNo} />
            {/* <input type='text' placeholder='Service Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setServiceProviderName(e.target.value) }}></input> */}
            <input type='text' placeholder='Regd Id' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setRegdId(e.target.value) }}></input>
            <input type='text' placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setPassword(e.target.value) }}></input>
            <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleClick}>Submit</button></p>
            <p className='flex justify-start text-sm'>Haven't registered yet?<HashLink smooth to='/register#registerForm' className='hover:text-violet-600 mx-2'>Register Now</HashLink></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceProviderLogin