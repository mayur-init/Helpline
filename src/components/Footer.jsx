import React, { useState, useContext } from 'react'
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa'
import axios from 'axios';
import { globalStateContext } from '../contexts/globalStateContext'
import { toast } from 'react-hot-toast';


const Footer = () => {

    const {userName} = useContext(globalStateContext);
    const [feedback, setFeedback] = useState();

    const handleFeedback = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/feedback`, {
            UserName: userName,
            FeedBack: feedback
        });

        if(res.data.msg === "success"){
            setFeedback('');
            toast.success("Thank you submitting your feedback");
        }
    }

    return (
        <div className='w-full h-[65vh] bg-slate-900 text-gray-300 px-2' id='contact'>
            <p className='text-2xl font-semibold p-8 flex justify-center'>Contact Us</p>
            <div className='w-[80vw] h-[30vh] pb-4 md:pb-0 grid grid-cols-2 md:grid-cols-1 place-content-center m-auto border-b-2 border-gray-600'>
                <div className='col-span-2 pt-8 md:pt-2'>
                    <p className='font-semibold uppercase text-md'>You Can Give Your Feedback</p>
                    <p className='pb-4 pt-2 text-md'>Write your Feedback</p>
                    <div className='flex flex-col sm:flex-row'>
                        <input className='w-full p-2 mr-4 rounded-md mb-4 text-black' value={feedback} onChange={(e) => { setFeedback(e.target.value) }} type="text" placeholder='Write Something...' />
                        <button className='py-2 self-start rounded-xl px-4 border-gray-100 border-2 hover:bg-slate-800 text-sm mb-2' onClick={() => { handleFeedback() }}>Send</button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-[80vw] mx-auto  mb-[5vh] justify-between sm:flex-row text-center text-gray-500'>
                <p className='py-4 text-sm'>All rights reserved | Helpline - 2022 - 23</p>
                <div className='flex justify-between md:w-[150px] pt-4 text-2xl'>
                    <FaFacebook />
                    <FaInstagram />
                    <FaGithub />
                </div>
            </div>
        </div>
    )
}

export default Footer