import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { globalStateContext } from '../../contexts/globalStateContext'
import axios from 'axios';

function AmbulanceServiceProviderPanel() {
    const [ServiceProviderName, setServiceProviderName] = useState('');
    const [RegdNo, setRegdNo] = useState('');
    const [ContactNo, setContactNo] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const { providerName } = useParams();
    const navigate = useNavigate();
    const { isProviderLoggedIn, setProviderLoggedIn } = useContext(globalStateContext);
    
   
    const handleSubmit = () => {
        const Data = {
            ServiceProviderName,
            RegdNo,
            Email,
            ContactNo,
            Address,
        }
        if (ServiceProviderName === '' || RegdNo === '' || Email === '' || ContactNo === '' || Address === '') {
            toast.error('Some fields are empty, fill them all');
          }else {
            fetch("http://localhost:5000/api/ambulance",{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(Data)
            }).then((result) => {
                console.warn(result);
            })
            
            // try {
            //     const response = await axios.post('http://localhost:5000/api/ambulance', Data, {
            //       headers: {
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            //       }
            //     });
            //     console.log("Data sent");
            //   } catch (error) {
            //     console.log(error);
            //   }
        }
        // setServiceProviderName('');
        // setRegdNo('');
        // setEmail('');
        // setContactNo('');
        // setAddress('');
  
    }
    useEffect(() => {
        if (!isProviderLoggedIn) {
            toast.error('You are not logged in, log in first');
            navigate('/login', { replace: true });
        }
    })

    const handleLogout = () => {
        setProviderLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/login', { replace: true });
    }


    return (
        <div className="" id='main'>
            <div name='panel-nav' className='h-[6vh] w-auto flex h justify-center py-2 px-3 border-b-2 border-gray-200 sticky top-0 z-50'>
                <p className='text-xl font-semibold hover:text-violet-500'>Helpline</p>
                <div className='ml-auto flex'>
                    <p className='border-gray-300 border-2 rounded-xl px-2 h-[27px]'>{providerName}</p>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='flex relative'>
                <div className=' bg-gray-200 h-screen w-[20vw] border-gray-200 border-r-2 fixed'>
                    {/*****************************Side-bar************************************/}
                    <div className='flex flex-col w-full h-full justify-start item-center py-5'>
                        {/*****************Query form-box*********************/}
                        <div className='bg-white rounded-xl p-4 w-[16vw] mx-auto my-6'>
                            <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add new ambulance</p>
                            <input type='text' onChange={(e) => { setServiceProviderName(e.target.value) }} value={ServiceProviderName} placeholder='Service Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                             <input type='text' onChange={(e) => { setRegdNo(e.target.value) }} value={RegdNo} placeholder='Regd No' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                           <input type='text' onChange={(e) => { setEmail(e.target.value) }} value={Email} placeholder='Email' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setContactNo(e.target.value) }} value={ContactNo} placeholder='Contact No' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
        <input type='text' onChange={(e) => { setAddress(e.target.value) }} value={Address} placeholder='Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                            <p className='flex justify-end'><button onClick={() => { handleSubmit() }} className='btn w-[100px] m-2'>Add</button></p>
                        </div>
                        <div className='bg-white rounded-xl p-4 w-[16vw] mx-auto my-6'>
                            <p className='text-center mt-2 mb-4 text-xl font-semibold'>Change Credentials</p>
                            <input type='text' placeholder='Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                            <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                            <input type='text' placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                            <p className='flex justify-end'><button className='btn w-[100px] m-2'>Change</button></p>
                        </div>
                    </div>
                </div>
                {/****************Query-box*******************/}
                <div className='h-full w-[80vw] ml-[20vw]'>
                    <p className='text-2xl font-semibold text-center m-4'>Registered Ambulances</p>
                    <div className='bg-gray-100 w-full h-[86vh]'>
                        {/****************List-of-registered-ambulances*******************/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AmbulanceServiceProviderPanel