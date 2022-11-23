import React from 'react'

import {
    FaFacebook,
    FaGithub,
    FaInstagram,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full mt-24 bg-slate-900 text-gray-300 py-y px-2'>
        <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8'>
            
            <div className='col-span-2 pt-8 md:pt-2'>
                <p className='font-bold uppercase'>You Can Give Your Feedback</p>
                <p className='py-4'>Write your Feedback</p>
                <form className='flex flex-col sm:flex-row'>
                    <input className='w-full p-2 mr-4 rounded-md mb-4' type="text" placeholder='Write Something..'/>
                    <button className='p-2 mb-4'>Send</button>
                </form>
            </div>
        </div>

        <div className='flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4'>All rights reserved</p>
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
            <FaFacebook />
            <FaInstagram />
            <FaGithub />
        </div>
        </div>
    </div>
  )
}

export default Footer