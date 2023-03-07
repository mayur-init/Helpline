import React, { useState } from 'react'
import DemoData from '../components/DemoData';
import DonorSearchBar from '../components/DonorSearchBar'
import Navbar from '../components/Navbar'

function DonorDetailsPage() {
  return (
    <div>
      <Navbar />
      <DonorSearchBar/>
      {/* start */}
      {/* <div className='flex justify-center flex-wrap font-Myfont'>

        {
          data.map((data) => {
            const { id, name, age, blood, contact, city, state } = data;

            return (

              <div className="mt-8 w-64 h-[312px] bg-slate-300 rounded-md m-4 pb-2 hover:scale-110" key={id}>

                 <h1 className='text-3xl font-bold'>Name:{name}</h1>
                <div>

                    <h1 className="mx-2 font-semibold text-xl">Age:{age}</h1>
                    <h2 className="mx-2">Blood Group:{blood}</h2>
                    <h2 className='mx-2'>Contact No:{contact}</h2>
                    <h2 className='mx-2'>City:{city}</h2>
                    <h2 className='mx-2'>State:{state}</h2>
                </div>

              </div>
            )
          }
          )
        }


      </div> */}
      {/* ends */}
    </div>
  )
}

export default DonorDetailsPage
