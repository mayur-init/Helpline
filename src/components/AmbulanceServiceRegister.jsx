import React, {useState} from 'react';
import AmbulanceRegister from './AmbulanceRegister';

function AmbulanceServiceRegister() {

    const [ServiceProviderName, setServiceProviderName] = useState('');
    const [OwnerName, setOwnerName] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [AadharNumber, setAadharNumber] = useState('');

    const util = () =>{

        const AmbulanceServiceData = {
            ServiceProviderName,
            OwnerName,
            ContactNumber,
            AadharNumber,
        }

        console.log(AmbulanceServiceData);

        setServiceProviderName('');
        setOwnerName('')
        setContactNumber('');
        setAadharNumber('');
    }
    return (
        <div className='rounded-xl shadow-xl p-4 min-h-max'>
            <h1 className='text-gray-600 text-2xl font-semibold mt-[4vh] flex justify-center'>Ambulance service</h1>
            <div className='flex flex-col w-[50vh] h-auto mt-[10vh] mb-[4vh]'>
                <input type='text' onChange={(e) => { setServiceProviderName(e.target.value) }} value={ServiceProviderName} placeholder='Service Provider Name' className='bg-gray-200 border-2 border-gray-600 rounded-full px-2 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setOwnerName(e.target.value) }} value={OwnerName} placeholder='Owner' className='bg-gray-200 border-2 border-gray-600 rounded-full px-2 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setContactNumber(e.target.value) }} value={ContactNumber} placeholder='Contact Number' className='bg-gray-200 border-2 border-gray-600 rounded-full px-2 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setAadharNumber(e.target.value) }} value={AadharNumber} placeholder='Aadhar Number' className='bg-gray-200 border-2 border-gray-600 rounded-full px-2 py-1 my-2'></input>
                <AmbulanceRegister />
                <p className='flex justify-end'><button onClick ={util} className='btn w-[100px] m-2'>Submit</button></p>
            </div>
        </div>
    )
}

export default AmbulanceServiceRegister