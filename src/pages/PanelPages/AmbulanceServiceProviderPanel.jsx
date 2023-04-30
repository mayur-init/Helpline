import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { globalStateContext } from '../../contexts/globalStateContext'
import { HiArrowSmallLeft, HiArrowSmallRight } from 'react-icons/hi2'


function AmbulanceServiceProviderPanel() {

    const { RegdId } = useParams();
    const navigate = useNavigate();
    const { isProviderLoggedIn, setProviderLoggedIn } = useContext(globalStateContext);
    const [providerData, setProviderData] = useState(null);

    var [pageNo, setPageNo] = useState(1);
    var cnt = pageNo;

    useEffect(() => {
        if (!isProviderLoggedIn) {
            toast.error('You are not logged in, log in first');
            navigate('/login', { replace: true });
        }
        collectProviderData();
    })

    

    useEffect(() => {
    }, [])

    const handleClick = () => {

    }

    const handleLogout = () => {
        setProviderLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/login', { replace: true });
    }

    const collectProviderData = async () => {
        const res = await axios.get(`http://localhost:5000/api/ambulanceservice/${RegdId.toUpperCase()}`);
        // console.log(res.data[0]);
        setProviderData(res.data[0]);
    }

    return (
        <div className="" id='main'>
            <div name='panel-nav' className='h-[6vh] w-auto flex h justify-center py-2 px-3 border-b-2 border-gray-200 sticky top-0 z-50'>
                <p className='text-xl font-semibold hover:text-violet-500'>Helpline</p>
                <div className='ml-auto flex'>
                    <p className='border-gray-300 border-2 rounded-xl px-2 h-[27px]'>{providerData !== null ? providerData.providerName : null}</p>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='flex relative'>
                <div className=' bg-gray-200 h-screen w-[20vw] border-gray-200 border-r-2 fixed'>
                    {/*****************************Side-bar************************************/}
                    <div className='flex flex-col w-full h-full justify-start item-center py-2'>
                        {/*****************Query form-box*********************/}
                        {/* <p className='text-end px-4 text-gray-400 text-[10px]'>Double click to navigate</p> */}
                        <div className='flex justify-end'>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(1) }}><HiArrowSmallLeft /></button>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(2) }}><HiArrowSmallRight /></button>
                        </div>
                        {/**********************Add Services Forms*******************************/}
                        {
                            pageNo === 2 ?
                                (<div className='bg-white rounded-xl p-4 w-[16vw] mx-auto my-8'>
                                    <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Ambulances</p>
                                    <input type='text' placeholder='Driver Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                                    <input type='text' placeholder='Driver ontact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                                    <p className='flex justify-end'><button className='btn w-[100px] m-2'>Add</button></p>
                                </div>) : null
                        }
                        <div>
                            {
                                pageNo === 1 ?
                                    (<div className='bg-white rounded-xl p-4 w-[16vw] mx-auto mt-[30vh]'>
                                        <p className='text-center mt-2 mb-4 text-xl font-semibold'>Change Credentials</p>
                                        <input type='text' placeholder='Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                                        <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                                        <input type='text' placeholder='Email' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                                        <input type='text' placeholder='Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                                        <input type='text' placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                                        <p className='flex justify-end'><button className='btn w-[100px] mx-2 my-1'>Update</button></p>
                                    </div>) : null
                            }
                        </div>
                    </div>
                </div>
                {
                    // ****************Query-box*******************
                    pageNo === 1 ?
                        (<div className='h-full w-[80vw] ml-[20vw]'>
                            <p className='text-2xl font-semibold text-center m-4'>Personal Information</p>
                            <div className='bg-gray-100 w-full h-[86vh] p-4'>
                                {/* ***************Personal Information****************** */}
                                {
                                    providerData !== null ?
                                        (
                                            <div>
                                                <p className='text-xl m-2'><span className='font-semibold'>User name: </span>{providerData.providerName}</p>
                                                <p className='text-xl m-2'><span className='font-semibold'>Regd Id: </span>{providerData.regdId}</p>
                                                <p className='text-xl m-2'><span className='font-semibold'>Email: </span>{providerData.email}</p>
                                                <p className='text-xl m-2'><span className='font-semibold'>Address: </span>{providerData.address}</p>
                                                <p className='text-xl m-2'><span className='font-semibold'>Password: </span>{providerData.password}</p>
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>) :
                        (<div className='h-full w-[80vw] ml-[20vw]'>
                            <p className='text-2xl font-semibold text-center m-4'>Registered Ambulances</p>
                            <div className='bg-gray-100 w-full h-[86vh]'>
                                {/****************List of registered ambulances*******************/}
                            </div>
                        </div>)
                }
            </div>
        </div >
    )
}

export default AmbulanceServiceProviderPanel