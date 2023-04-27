import React, { useState,useEffect } from 'react'

function OxygenCylinderHero() {
  const [oxygencylinderproviders, setOxygencylinderproviders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/oxygencylinderproviders')
      .then(res => res.json())
      .then(data => setOxygencylinderproviders(data))
      .catch(error => console.log(error));
  }, []);
  return (
   <div>
    { /* Hero Page Starts */}
    <div className='w-full h-[100vh] bg-white  flex flex-col justify-between'>
                {/* Hero Page Start */}
                <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                    <div>
                        <img className='w-[70%] h-[80%] mix-blend-multiply ml-[6vw]' src={'assets/oxygen_cylinder.avif'} alt="/" />
                    </div>
                    <div className='flex flex-col justify-center md:items-start mt-[12vh] w-full px-12'>
                        <p className='text-3xl md:text-5xl font-bold text-gray-400'>Book Your Oxygen Cylinder</p>
                        <h1 className='py-3 text-5xl md:text-7xl font-bold text-gray-800 hover:text-red-600'>Save Your Time</h1>
                    </div>
                </div>
    </div>
    { /* Hero Page Ends */}

    {/*OxygenProvider Details Start*/}
    <h1 className='text-4xl font-bold my-12 text-gray-800 text-center '>Our Oxygen Providers Details</h1>
        
        <div className='h-screen flex flex-col justify-content-center mx-5 mb-[10vh]'>
        {
            oxygencylinderproviders.map((item) => {
                const { _id, providerName, address, regdId , email, contactNo} = item;
                return (
                    <div className="border min-h-[10vh] w-[60vw] mx-auto bg-white m-4 py-5 px-[5vw] rounded-3xl shadow-xl" key={_id}>
                            <h1 className="font-bold text-2xl text-gray-600 my-2">{providerName}</h1>
                            <h2 className="text-xl my-2 font-semibold">Contact No: {contactNo}</h2>
                            <h1 className='text-xl my-2 font-semibold'>Address: {address}</h1>
                            {/* <h2 className="text-xl my-3 font-semibold">Registration No: {regdNo}</h2>
                            <h2 className="text-xl my-3 font-semibold">Email: {email}</h2> */}
                    </div>
                   
                )
            })
        }
         </div>
        {/*OxygenProvider Details Ends*/}

    </div>
  )
}

export default OxygenCylinderHero