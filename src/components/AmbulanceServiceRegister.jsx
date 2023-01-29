import React, {useState} from 'react';
import AmbulanceRegister from './AmbulanceRegister';
import axios from 'axios';

function AmbulanceServiceRegister() {

    const [ServiceProviderName, setServiceProviderName] = useState('');
    const [OwnerName, setOwnerName] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [AadharNumber, setAadharNumber] = useState('');
    const [VehicleNumber, setVehicleNumber] = useState('');
    const [RegisterNumber, setRegisterNumber] = useState('');
    const [DriverContact, setDriverContact] = useState('');

    const util = () =>{

        const AmbulanceServiceData = {
            ServiceProviderName,
            OwnerName,
            ContactNumber,
            AadharNumber,
            AmbulanceData:{
                VehicleNumber,
                RegisterNumber,
                DriverContact,
            },
        }

        console.log(AmbulanceServiceData);

        setServiceProviderName('');
        setOwnerName('')
        setContactNumber('');
        setAadharNumber('');
        setVehicleNumber('');
        setRegisterNumber('');
        setDriverContact('');
    }

    return (
        <div className='rounded-xl shadow-xl p-4 min-h-max'>
            <h1 className='text-gray-600 text-3xl font-bold my-[4vh] flex justify-center hover:text-violet-600'>Ambulance service</h1>
            <div className='flex flex-col w-[50vh] h-auto mt-[8vh] mb-[2vh]'>
                <input type='text' onChange={(e) => { setServiceProviderName(e.target.value) }} value={ServiceProviderName} placeholder='Service Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setOwnerName(e.target.value) }} value={OwnerName} placeholder='Owner' className='border-2 border-gray-600 rounded-full px-2 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setContactNumber(e.target.value) }} value={ContactNumber} placeholder='Contact Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setAadharNumber(e.target.value) }} value={AadharNumber} placeholder='Aadhar Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                {/* <AmbulanceRegister /> */}
                <div className='flex flex-col w-[50vh] h-auto mt-[4vh]'>
                    <input type='text' onChange={(e) =>{setVehicleNumber(e.target.value)}} value={VehicleNumber} placeholder='Vehicle Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                    <input type='text' onChange={(e) =>{setRegisterNumber(e.target.value)}} value={RegisterNumber} placeholder='Register Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                    <input type='text' onChange={(e) =>{setDriverContact(e.target.value)}} value={DriverContact}placeholder='Driver Contact Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                    {/* <p className='flex justify-end'><button onClick={() => {util}} className='btn m-2 '>Add Ambulance</button></p> */}
                </div>
                <p className='flex justify-end'><button onClick ={() => {util()}} className='btn mx-2 m-2'>Submit</button></p>
            </div>
        </div>
    )
}

export default AmbulanceServiceRegister