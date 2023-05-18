import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { globalStateContext } from '../../contexts/globalStateContext'
import { HiArrowSmallLeft, HiArrowSmallRight, HiBars3, HiXMark } from 'react-icons/hi2'

function AmbulanceServiceProviderPanel() {

    const { RegdId } = useParams();
    const navigate = useNavigate();
    const { isProviderLoggedIn, setProviderLoggedIn } = useContext(globalStateContext);
    const [providerData, setProviderData] = useState(null);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState({
        providerName: "",
        contactNo: "",
        email: "",
        address: "",
        password: "",
    });
    //ambulance states
    const [DriverName, setDriverName] = useState('');
    const [DriverContactNo, setDriverContactNo] = useState('');
    const [RegisteredAmbulances, setRegisteredAmbulances] = useState([]);
    var [pageNo, setPageNo] = useState(1);
    var cnt = pageNo;

    useEffect(() => {
        if (!isProviderLoggedIn) {
            toast.error('You are not logged in, log in first');
            navigate('/login', { replace: true });
        }
        collectProviderData();
    }, [])
    const collectProviderData = async () => {
        const res = await axios.get(`http://localhost:5000/api/ambulanceservice/getparticularprovider/${RegdId.toUpperCase()}`);
        // console.log(res.data[0]);
        setProviderData(res.data[0]);
    }

    const handleLogout = () => {
        setProviderLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/', { replace: true });
    }

    const handleAmbulanceSubmit = async (e) => {
        e.preventDefault();
        if (DriverName === "" || DriverContactNo === "") {
            toast.error("All fields are mendatory");
        }

        const ambulanceData = {
            DriverName,
            ParentRegdId: providerData.regdId,
            DriverContactNo
        }
        // console.log(ambulanceData);
        try {
            const response = await axios.post('http://localhost:5000/api/ambulance', ambulanceData);
            // console.log(response);
            if (response.data.msg === "success") {
                toast.success('Ambulance Added');
            }
        } catch (err) {
            console.log(err);
            if (err.response.data.msg === "contact no already exist") {
                toast.error("This contact no is already registered");
            }
        }
        setDriverName('');
        setDriverContactNo('');
    }


    const handleFillData = async (regdId) => {
        const res = await axios.get(`http://localhost:5000/api/ambulanceservice/${regdId}`);
        // console.log(res.data[0]);
        setUpdateData(res.data[0]);
    }
    //Delete Ambulance Provider Details
    const handleDelete = async (regdId) => {
        try {
            console.log(regdId);
            const response = await axios.delete(`http://localhost:5000/api//ambulanceservice/${regdId}`);
            handleLogout();
        } catch (err) {
            console.log(err);
        }

    }
    const handleUpdate = async (regdId) => {
        try {
            axios.put(`http://localhost:5000/api//ambulanceservice/${regdId}`, updateData).then((response) => {
                console.log(response);
                console.log(updateData);
                setUpdateData({
                    providerName: "",
                    contactNo: "",
                    email: "",
                    address: "",
                    password: "",
                });
            });
            setProviderData(updateData);
        } catch (err) {
            console.log(err);
        }
    }
    //Delete ambulances dtails
    const deleteData = async (contact) => {
        try {
            var response = null;
            response = await axios.delete(`http://localhost:5000/api//ambulances/${contact}`);
            // console.log(response);
            if (response.data.msg === "Success") {
                toast.success("Deleted successfully");
            } else {
                toast.error("Something went wrong!");
            }

            getAllRegisteredAmbulanceData()

        } catch (err) {
            console.log(err);
        }
    }
    const getAllRegisteredAmbulanceData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/ambulances/${providerData.regdId}`);
            // console.log(res.data);
            setRegisteredAmbulances(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    getAllRegisteredAmbulanceData();
    // console.log(RegisteredAmbulances);
    return (
        <div className="" id='main'>
            <div name='panel-nav' className='h-[6vh] bg-white w-auto flex h justify-center py-2 px-3 border-b-2 border-gray-200 sticky top-0 z-50'>
                <p className='text-xl font-semibold hover:text-violet-500'>Helpline</p>
                <div className='ml-auto flex'>
                    <p className='border-gray-300 border-2 rounded-xl px-2 h-[27px]'>{providerData !== null ? providerData.providerName : null}</p>
                    <button className='mx-2 font-semibold underline text-sm md:text-md hover:text-violet-600' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className={open ? 'bg-gray-200 h-screen w-[70vw] md:w-[25vw] border-gray-200 border-r-2 fixed duration-500' : 'bg-gray-200 h-screen w-[10vw] md:w-[25vw] fixed duration-500'}>
                    {/*****************************Side-bar************************************/}
                    <div className='flex flex-col w-full h-full justify-start item-center py-2 relative'>
                        {/*****************Query form-box*********************/}
                        {/* <p className='text-end px-4 text-gray-400 text-[10px]'>Double click to navigate</p> */}
                        <div className='flex justify-end'>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(1) }}><HiArrowSmallLeft /></button>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(2) }}><HiArrowSmallRight /></button>
                            <button className='md:hidden p-2' onClick={() => { setOpen(!open) }} >{open ? <HiXMark size={30} /> : <HiBars3 size={30}/>}</button>
                        </div>
                        {/**********************Add Services Forms*******************************/}
                        {
                            pageNo === 2 ?
                                (<div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto my-8 duration-500' : 'hidden md:flex flex-col bg-white rounded-xl p-4 w-[20vw] mx-auto my-8'}>
                                    <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Ambulances</p>
                                    <input type='text' placeholder='Driver Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={DriverName} onChange={(e) => { setDriverName(e.target.value) }}></input>
                                    <input type='text' placeholder='Driver Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={DriverContactNo} onChange={(e) => { setDriverContactNo(e.target.value) }}></input>
                                    <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleAmbulanceSubmit}>Add</button></p>
                                </div>) : null
                        }
                        <div>
                            {
                                pageNo === 1 ?
                                    (<div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto mt-[10vh] duration-500' : 'hidden md:flex flex-col bg-white p-4 rounded-xl w-[20vw] mx-auto mt-[10vh]'}>
                                        <p className='text-center mt-2 mb-4 text-xl font-semibold'>Change Credentials</p>
                                        <input type='text' placeholder='Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.providerName} onChange={(e) => { setUpdateData({ ...updateData, providerName: e.target.value }) }}></input>
                                        <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.contactNo} onChange={(e) => { setUpdateData({ ...updateData, contactNo: e.target.value }) }}></input>
                                        <input type='text' placeholder='Email' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.email} onChange={(e) => { setUpdateData({ ...updateData, email: e.target.value }) }}></input>
                                        <input type='text' placeholder='Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.address} onChange={(e) => { setUpdateData({ ...updateData, address: e.target.value }) }}></input>
                                        <input type='text' placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.password} onChange={(e) => { setUpdateData({ ...updateData, password: e.target.value }) }}></input>
                                        <p className='flex justify-end'><button className='btn w-[100px] mx-2 my-1' onClick={() => handleUpdate(providerData.regdId)}>Submit</button></p>
                                    </div>) : null
                            }
                        </div>
                    </div>
                </div>
                {
                    // ****************Query-box*******************
                    pageNo === 1 ?
                        (<div className='h-full md:h-[93vh] w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                            <p className='text-xl md:text-2xl font-semibold text-center m-4'>Personal Information</p>
                            <div className='bg-gray-100 w-full h-[86vh] p-4'>
                                {/* ***************Personal Information****************** */}
                                {
                                    providerData !== null ?
                                        (
                                            <div>
                                                <p className='md:text-xl m-2'><span className='font-semibold'>User name: </span>{providerData.providerName}</p>
                                                <p className='md:text-xl m-2'><span className='font-semibold'>Regd Id: </span>{providerData.regdId}</p>
                                                <p className='md:text-xl m-2'><span className='font-semibold'>Email: </span>{providerData.email}</p>
                                                <p className='md:text-xl m-2'><span className='font-semibold'>Address: </span>{providerData.address}</p>
                                                <p className='md:text-xl m-2'><span className='font-semibold'>Password: </span>{providerData.password}</p>
                                                <div className='my-6'>
                                                    <button className='btn' onClick={() => { handleFillData(providerData.regdId); setOpen(true) }}>Update</button>
                                                    <button className='btn' onClick={() => handleDelete(providerData.regdId)}>Delete</button>
                                                </div>
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>) :
                        (<div className='h-full w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                            <p className='text-xl md:text-2xl font-semibold text-center m-4'>Registered Ambulances</p>
                            <div className='bg-gray-100 w-full h-[100vh] p-4'>
                                {/****************List of registered ambulances*******************/}
                                {
                                    RegisteredAmbulances.map((ambulance) => {
                                        const { _id, driverName, driverContactNo } = ambulance;
                                        return (
                                            <div className='bg-white p-4 m-4 rounded-xl text-md md:text-xl font-semibold' key={_id}>
                                                <p>Driver Name: <span className='font-normal'>{driverName}</span></p>
                                                <p>Driver Contact No: <span className='font-normal'>{driverContactNo}</span></p>
                                                <p className='flex justify-end my-1'><button className='btn' onClick={() => deleteData(driverContactNo)}>Delete</button></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>)
                }
            </div>
        </div >
    )
}

export default AmbulanceServiceProviderPanel