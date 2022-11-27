import React, {useState, useEffect} from 'react'

function AmbulanceRegister() {

    const [VehicleNumber, setVehicleNumber] = useState('');
    const [RegisterNumber, setRegisterNumber] = useState('');
    const [DriverContact, setDriverContact] = useState('');

    const util = () =>{
        
        const AmbulanceData = {
            VehicleNumber,
            RegisterNumber,
            DriverContact,
        }

        console.log(AmbulanceData); 

        setVehicleNumber('');
        setRegisterNumber('');
        setDriverContact('');
    }

    return (
        <div className='flex flex-col w-[50vh] h-auto mt-[4vh]'>
            <input type='text' onChange={(e) =>{setVehicleNumber(e.target.value)}} value={VehicleNumber} placeholder='Vehicle Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
            <input type='text' onChange={(e) =>{setRegisterNumber(e.target.value)}} value={RegisterNumber} placeholder='Register Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
            <input type='text' onChange={(e) =>{setDriverContact(e.target.value)}} value={DriverContact}placeholder='Driver Contact Number' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
            <p className='flex justify-end'><button onClick={() => {util}} className='btn m-2 '>Add Ambulance</button></p>
        </div>
    )
}

export default AmbulanceRegister;