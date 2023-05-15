import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { globalStateContext } from '../../contexts/globalStateContext'
import { HiBars3, HiXMark } from 'react-icons/hi2'

function UserPanel() {

    const { userName, userId, isUserLoggedIn, setUserLoggedIn } = useContext(globalStateContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    const [updateData, setUpdateData] = useState({
        userName: "",
        contactNo: "",
        location: "",
    });

    useEffect(() => {
        if (!isUserLoggedIn) {
            toast.error('You are not logged in, log in first');
            navigate('/login', { replace: true });
        }
        collectUserData();
    }, [])
    const collectUserData = async () => {
        const res = await axios.get(`http://localhost:5000/api/users/${userId.toUpperCase()}`);
        // console.log(res.data[0]);
        setUserData(res.data[0]);
    }


    const handleLogout = () => {
        setUserLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/login', { replace: true });
    }
    const handleFillData = async (regdId) => {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        // console.log(res.data[0]);
        setUpdateData(res.data[0]);
    }
    //Delete User Details
    const handleDelete = async (regdId) => {
        try {
            // console.log(regdId);
            const response = await axios.delete(`http://localhost:5000/api//users/${userId}`);
            handleLogout();
        } catch (err) {
            console.log(err);
        }

    }
    const handleUpdate = async (regdId) => {
        try {
            axios.put(`http://localhost:5000/api//users/${userId}`, updateData).then((response) => {
                console.log(response);
                // console.log(updateData);
                setUpdateData({
                    userName: "",
                    contactNo: "",
                    location: "",
                });
            });
            setUserData(updateData);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="" id='main'>
            <div name='panel-nav' className='h-[6vh] w-auto flex h justify-center py-2 px-3 border-b-2 border-gray-200 sticky top-0 z-50'>
                <p className='text-xl font-semibold hover:text-violet-500'>Helpline</p>
                <div className='ml-auto flex'>
                    <p className='border-gray-300 border-2 rounded-xl px-2 h-[27px]'>{userName}</p>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className={open ? 'bg-gray-200 h-screen w-[70vw] md:w-[25vw] border-gray-200 border-r-2 fixed duration-500' : 'bg-gray-200 h-screen w-[10vw] md:w-[25vw] fixed duration-500'}>
                    <div className='flex justify-end'>
                        <button className='md:hidden p-2' onClick={() => { setOpen(!open) }} >{open ? <HiXMark size={30} /> : <HiBars3 size={30} />}</button>
                    </div>
                    {/*****************************Side-bar************************************/}
                    <div className='flex flex-col w-full h-full justify-start item-end py-4 relative'>
                        {/*****************Query form-box*********************/}
                        <div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto mt-[10vh]' : 'hidden md:flex flex-col bg-white p-4 rounded-xl w-[20vw] mx-auto mt-[10vh]'}>
                            <p className='text-center mt-2 mb-4 text-xl font-semibold'>Change Credentials</p>
                            <input type='text' placeholder='User name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.userName} onChange={(e) => { setUpdateData({ ...updateData, userName: e.target.value }) }}></input>
                            <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.contactNo} onChange={(e) => { setUpdateData({ ...updateData, contactNo: e.target.value }) }}></input>
                            <input type='text' placeholder='Location' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.location} onChange={(e) => { setUpdateData({ ...updateData, location: e.target.value }) }}></input>
                            <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={() => handleUpdate(userData.regdId)}>Change</button></p>
                        </div>
                    </div>
                </div>
                {/****************Query-box*******************/}
                <div className='h-full w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                    <p className='text-2xl font-semibold text-center m-4'>Personal Information</p>
                    <div className='bg-gray-100 w-full h-[86vh]'>
                        {/****************Personal Information*******************/}
                        {
                            userData !== null ?
                                (
                                    <div>
                                        <p className='text-xl m-2'><span className='font-semibold'>User Name: </span>{userData.userName}</p>
                                        <p className='text-xl m-2'><span className='font-semibold'>Regd Id: </span>{userData.regdId}</p>
                                        <p className='text-xl m-2'><span className='font-semibold'>Contact No: </span>{userData.contactNo}</p>
                                        <p className='text-xl m-2'><span className='font-semibold'>Location: </span>{userData.location}</p>
                                        <button className='btn' onClick={() => { handleFillData(userData.RegdId); setOpen(true) }}>Update</button>
                                        <button className='btn bg-red-600' onClick={() => handleDelete(userData.RegdId)}>Delete</button>
                                    </div>
                                ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanel