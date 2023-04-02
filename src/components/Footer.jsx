import React from 'react'

import {
    FaFacebook,
    FaGithub,
    FaInstagram,
} from 'react-icons/fa'

const Footer = () => {


  return (
    <div className='w-full h-[40vh] mt-24 bg-slate-900 text-gray-300 px-2'>
        <div className='w-[80vw] h-[30vh] grid grid-cols-2 md:grid-cols-1 place-content-center m-auto border-b-2 border-gray-600'>
            <div className='col-span-2 pt-8 md:pt-2'>
                <p className='font-bold uppercase text-xl'>You Can Give Your Feedback</p>
                <p className='py-4 text-md'>Write your Feedback</p>
                <div className='flex flex-col sm:flex-row'>
                    <input className='w-full p-2 mr-4 rounded-md mb-4 text-black' type="text" placeholder='Write Something..'/>
                    <button className='p-2 mb-4'>Send</button>
                </div>
            </div>
        </div>

        <div className='flex flex-col w-[80vw] mx-auto mb-[5vh] justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4 text-xl'>All rights reserved | Helpline - 2022</p>
        <div className='flex justify-between sm:w-[200px] pt-4 text-2xl'>
            <FaFacebook />
            <FaInstagram />
            <FaGithub />
        </div>
        </div>
    </div>
  )
}

export default Footer