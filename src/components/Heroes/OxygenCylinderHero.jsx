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
                        <img className='w-full mix-blend-multiply' src={'assets/oxygen_cylinder.avif'} alt="/" />
                    </div>
                    <div className='flex flex-col justify-center md:items-start w-full px-12'>
                        <p className='text-3xl md:text-5xl font-bold text-violet-600'>Book Your Oxygen Cylinder</p>
                        <h1 className='py-3 text-5xl md:text-7xl font-bold text-red-600 hover:scale-105'>Save Your Time</h1>
                    </div>
                </div>
    </div>
    { /* Hero Page Ends */}

    {/*OxygenProvider Details Start*/}
    <h1 className='text-4xl font-bold my-10 text-violet-600 text-center hover:scale-110'>Our Oxygen Providers Details</h1>
        
        <div className='grid md:grid-cols-3 gap-3 mx-5'>
        {
            oxygencylinderproviders.map((item) => {
                const { id, providerName, address, regdNo ,email, contactNo} = item;
                return (
                    <div className="border min-h-[70vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105" key={id}>
                            <h1 className="mx-2 font-bold text-3xl text-center text-violet-600 my-3">{providerName}</h1>
                            <h1 className='text-xl mt-7 font-semibold'>Address: {address}</h1>
                            <h2 className="text-xl my-3 font-semibold">Registration No: {regdNo}</h2>
                            <h2 className="text-xl my-3 font-semibold">Email: {email}</h2>
                            <h2 className="text-xl my-3 font-semibold">Contact No: {contactNo}</h2>
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