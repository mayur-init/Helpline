import React, {useState} from 'react'
/* import axios from "axios"; */

function OxygenCylinderRegister() {
    const [OxygenCylinderProviderName, setOxygenCylinderProviderName] = useState('');
    const [RegdNo, setRegdNo] = useState('');
    const [Email, setEmail] = useState('');
    const [ContactNo, setContactNo] = useState('');
    const [Address, setAddress] = useState('');

    const util = /*async*/() => {

        const OxygenCylinderProviderData = {
            OxygenCylinderProviderName,
            RegdNo,
            Email,
            ContactNo,
            Address,
        }

        console.log(OxygenCylinderProviderData);

        /* try {
            const response = await axios.post('http://localhost:5000/api/oxygencylinder', OxygenCylinderProviderData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  }
            });
            console.log("sent");
          } catch(error) {
            console.log(error);
          } */

        setOxygenCylinderProviderName('');
        setRegdNo('');
        setEmail('');
        setContactNo('');
        setAddress('');
    }

    return (
        <div className='shadow-xl p-4 rounded-xl min-h-max'>
            <h1 className='text-gray-600 text-3xl font-bold my-[4vh] flex justify-center hover:text-violet-600'>Oxygen Cylinder Service</h1>
            <div className='flex flex-col w-[50vh] h-auto mt-[8vh] mb-[4vh]'>
                <input type='text' onChange={(e) => { setOxygenCylinderProviderName(e.target.value) }} value={OxygenCylinderProviderName} placeholder='Service Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setRegdNo(e.target.value) }} value={RegdNo} placeholder='Regd No' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setEmail(e.target.value) }} value={Email} placeholder='Email' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setContactNo(e.target.value) }} value={ContactNo} placeholder='Contact No' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setAddress(e.target.value) }} value={Address} placeholder='Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <p className='flex justify-end'><button onClick={util} className='btn w-[100px] m-2'>Submit</button></p>
            </div>
        </div>
    )
}

export default OxygenCylinderRegister