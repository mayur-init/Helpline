import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar'
import { globalStateContext } from '../contexts/globalStateContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import QueryTypeDropdown from '../components/Dropdowns/QueryTypeDropdown'

function EnquiryPage() {
  const [open,setOpen] = useState(false);
  const options = [
    { label: 'Blood bank query', id: 1 },
    { label: 'oxygen cylinder query', id: 2 },
    { label: 'other...', id: 3 }
  ]


  const [queryType, setQueryType] = useState(0);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { userId } = useContext(globalStateContext);
  const EnquiryId = useRef();

  const enquiryData = {
    EnquiryId,
    ParentRegdId: userId,
    EnquiryType: queryType,
    Enquiry: query,
  }

  const { isUserLoggedIn } = useContext(globalStateContext);
  useEffect(() => {
    if (!isUserLoggedIn) {
      toast.error('You are not logged in, log in first')
      navigate('/login#loginForm', { replace: true });
    }
  });

  const handleClick = async () => {
    if (queryType === 0 || query === '') {
      toast.error('Write some query first')
    } else {
      try {
        await generateRegdId();
        // console.log(enquiryData);
        const response = await axios.post('http://localhost:5000/api/enquiry', enquiryData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          }
        });
        // console.log("Data sent");
      } catch (error) {
        console.log(error);
      }

      setQueryType(0);
      setQuery('');
      toast.success('New query posted');
    }

  }

  const generateRegdId = async () => {
    const response = await axios.post('http://localhost:5000/api/generateregdid', {IdType: 'USER'});
    enquiryData.EnquiryId = response.data.generatedId;
  }

  return (
    <div className="" id='main'>
      <Navbar />
      {/* <EnquiryHero/> */}
      <div className='flex'>
        <div className={open ?'bg-gray-200 h-screen w-[70vw] md:w-[25vw] border-gray-200 border-r-2 fixed duration-500':'bg-gray-200 h-screen w-[10vw] md:w-[25vw] fixed duration-500'}>
          {/*****************************Side-bar************************************/}
          <div className='flex flex-col w-full h-full justify-start item-center py-5 relative'>
            {/*****************Query form-box*********************/}
            <div className='bg-white rounded-xl p-4 w-[16vw] mx-auto'>
              <p className='text-center mt-2 mb-4 text-xl font-semibold'>Write your queries</p>
              <QueryTypeDropdown title='Select query type' options={options} setQueryType={setQueryType} />
              <textarea type='text' placeholder='Query' className='border-2 h-[10vh] w-[14vw] border-gray-600 rounded-xl px-3 py-1 my-2' value={query} onChange={(e) => { setQuery(e.target.value) }}></textarea>
              <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleClick}>Submit</button></p>
            </div>
          </div>
        </div>
        {/****************Query-box*******************/}
        <div className='h-screen w-[80vw] ml-[20vw]'>
          <p className='text-2xl font-semibold text-center m-4'>Your queries</p>
        </div>
      </div>
    </div>
  )
}

export default EnquiryPage