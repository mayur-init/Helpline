import React, { useContext, useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { globalStateContext } from '../../contexts/globalStateContext'
import { HiArrowSmallLeft, HiArrowSmallRight } from 'react-icons/hi2'


function HospitalPanel() {

    const { RegdId } = useParams();
    const navigate = useNavigate();
    var [pageNo, setPageNo] = useState(1);
    const { isProviderLoggedIn, setProviderLoggedIn } = useContext(globalStateContext);
    const [providerData, setProviderData] = useState(null);

    //ambulance states
    const [DriverName, setDriverName] = useState('');
    const [ParentRegdId, setParentRegdId] = useState(null);
    const [DriverContactNo, setDriverContactNo] = useState('');
    const [ambulanceServiceId, setAmbulanceServiceId] = useState('');
    var cnt = pageNo;

    //
    const [BloodBankContactNo, setBloodBankContactNo] = useState('');
    const [OxygenSerivceContactNo, setOxygenServiceContactNo] = useState('');
    const [AmbulnceServiceContactNo, setAmbulanceServiceContactNo] = useState('');
    const [ProviderType, setProviderType] = useState('');
    const [RegisteredServicesData, setRegisteredServiceData] = useState();
    // var RegisteredServicesData = useRef(null);

    useEffect(() => {
        if (!isProviderLoggedIn) {
            toast.error('You are not logged in, log in first');
            navigate('/login', { replace: true });
        }
        collectProviderData();
    }, [])    

    const collectProviderData = async () => {
        const res = await axios.get(`http://localhost:5000/api/hospital/${RegdId.toUpperCase()}`);
        // console.log(res.data[0]);
        setProviderData(res.data[0]);
        // console.log(providerData);
    }

    const handleLogout = () => {
        setProviderLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/login', { replace: true });
    }

    const handleAmbulanceSubmit = async (e) => {
        e.preventDefault();
        setParentRegdId(ambulanceServiceId);

        if (DriverName === "" || DriverContactNo === "") {
            toast.error("All fields are mendatory");
        }

        const ambulanceData = {
            DriverName,
            ParentRegdId,
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

    const handleBloodBankSubmit = async (e) => {
        e.preventDefault();
        console.log(RegisteredServicesData);
        if (RegisteredServicesData !== null && RegisteredServicesData.bloodBank.regdId !== null) {
            toast.error("Blood bank service already registered");
        }
        else {
            if (BloodBankContactNo === "") {
                toast.error("Blood Bank service contact is required");
            } else {
                setProviderType(2);
                const generatedId = await generateRegdId();
                const Data = {
                    ServiceProviderName: providerData.providerName,
                    ContactNo: BloodBankContactNo,
                    Email: providerData.email,
                    RegdId: generatedId,
                    ParentRegdId: providerData.regdId,
                    Address: providerData.address,
                    Password: providerData.password,
                }
                try {
                    const response = await axios.post('http://localhost:5000/api/bloodbank', Data, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        }
                    });
                    if (response.data.msg === "success") {
                        toast.success('Blood Bank Service Added');
                    }
                } catch (err) {
                    console.log(err);
                    if (err.response.data.msg === "contact no already exist") {
                        toast.error("This contact no is already registered");
                    }
                }
                setBloodBankContactNo('');
            }
            // console.log(ambulanceData);
        }
        getRegistedAllServicesData();
    }

    const handleOxygenServiceSubmit = async (e) => {
        e.preventDefault();
        if (RegisteredServicesData !== null && RegisteredServicesData.oxygenService.regdId !== null) {
            toast.error("Oxygen service already registered");
        } else {
            if (OxygenSerivceContactNo === "") {
                toast.error("Oxygen service contact is required");
            } else {
                setProviderType(3);
                const generatedId = await generateRegdId();
                const Data = {
                    ServiceProviderName: providerData.providerName,
                    ContactNo: OxygenSerivceContactNo,
                    Email: providerData.email,
                    RegdId: generatedId,
                    ParentRegdId: providerData.regdId,
                    Address: providerData.address,
                    Password: providerData.password,
                }
                // console.log(ambulanceData);
                try {
                    const response = await axios.post('http://localhost:5000/api/oxygencylinder', Data, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        }
                    });
                    if (response.data.msg === "success") {
                        toast.success('Oxygen Service Added');
                    }
                } catch (err) {
                    console.log(err);
                    if (err.response.data.msg === "contact no already exist") {
                        toast.error("This contact no is already registered");
                    }
                }
                setOxygenServiceContactNo('');
            }
        }
        getRegistedAllServicesData();
    }

    const handleAmbulnceServiceSubmit = async (e) => {
        e.preventDefault();
        // console.log(providerData);
        console.log(RegisteredServicesData);
        if (RegisteredServicesData !== null && RegisteredServicesData.ambulanceService.regdId !== null) {
            toast.error("Ambulance service already registered");
        } else {
            if (AmbulnceServiceContactNo === "") {
                toast.error("Ambulance service contact is required");
            } else {
                setProviderType(1);
                const generatedId = await generateRegdId();
                setAmbulanceServiceId(generatedId);
                const Data = {
                    ServiceProviderName: providerData.providerName,
                    ContactNo: AmbulnceServiceContactNo,
                    Email: providerData.email,
                    RegdId: generatedId,
                    ParentRegdId: providerData.regdId,
                    Address: providerData.address,
                    Password: providerData.password,
                }
                // console.log(Data);
                try {
                    const response = await axios.post('http://localhost:5000/api/ambulanceservice', Data, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        }
                    });
                    if (response.data.msg === "success") {
                        toast.success('Oxygen Service Added');
                    }
                } catch (err) {
                    console.log(err);
                    if (err.response.data.msg === "contact no already exist") {
                        toast.error("This contact no is already registered");
                    }
                }
                setAmbulanceServiceContactNo('');
            }
            // console.log(ambulanceData);
        }
        getRegistedAllServicesData();
    }

    const generateRegdId = async () => {
        var response;

        if (ProviderType === 1) {
            response = await axios.post('http://localhost:5000/api/generateregdid', { IdType: 'AMBU' });
        } else if (ProviderType === 2) {
            response = await axios.post('http://localhost:5000/api/generateregdid', { IdType: 'BLOOD' });
        } else if (ProviderType === 3) {
            response = await axios.post('http://localhost:5000/api/generateregdid', { IdType: 'OXYG' });
        }
        // console.log(response);
        return response.data.generatedId;
    }

    const getRegistedAllServicesData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api//hospital/getallservices/${providerData.regdId}`);
            setRegisteredServiceData(response.data);
            // console.log(response.data);
            // console.log(RegisteredServicesData);
        } catch (err) {
            console.log(err);
        }
    }

    getRegistedAllServicesData();

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
                        <p className='text-end px-4 text-gray-400 text-[10px]'>Double click to navigate</p>
                        <div className='flex justify-end'>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(1) }}><HiArrowSmallLeft /></button>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(cnt++ % 4) }}><HiArrowSmallRight /></button>
                        </div>
                        {/**********************Add Services Forms*******************************/}
                        {

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
                                    </div>) : pageNo === 2 ?
                                        (<div>
                                            <div className='bg-white rounded-xl py-2 px-4 w-[16vw] mx-auto my-4'>
                                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Ambulance Service</p>
                                                <input type='text' placeholder='Dept Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setAmbulanceServiceContactNo(e.target.value) }}></input>
                                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleAmbulnceServiceSubmit}>Add</button></p>
                                            </div>
                                            <div className='bg-white rounded-xl py-2 px-4 w-[16vw] mx-auto my-4'>
                                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Blood Bank</p>
                                                <input type='text' placeholder='Dept Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setBloodBankContactNo(e.target.value) }}></input>
                                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleBloodBankSubmit}>Add</button></p>
                                            </div>
                                            <div className='bg-white rounded-xl py-2 px-4 w-[16vw] mx-auto my-2'>
                                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Oxygen Service</p>
                                                <input type='text' placeholder='Dept Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setOxygenServiceContactNo(e.target.value) }}></input>
                                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleOxygenServiceSubmit}>Add</button></p>
                                            </div>
                                        </div>) : pageNo === 3 ?
                                            (<div>
                                                <div className='bg-white rounded-xl p-4 w-[16vw] mx-auto my-4'>
                                                    <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Ambulances</p>
                                                    <input type='text' placeholder='Driver Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setDriverName(e.target.value) }}></input>
                                                    <input type='text' placeholder='Driver Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setDriverContactNo(e.target.value) }}></input>
                                                    <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleAmbulanceSubmit}>Add</button></p>
                                                </div>
                                            </div>
                                            ) : null
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
                        pageNo === 2 ?
                            (<div className='h-full w-[80vw] ml-[20vw]'>
                                <p className='text-2xl font-semibold text-center m-4'>Registered Services</p>
                                <div className='bg-gray-100 w-full h-[86vh] p-4'>
                                    {/****************List of registered services*******************/}
                                    {/* <div className='bg-white p-4 m-4 rounded-xl text-xl font-semibold'>
                                        <p>RegdId: {RegisteredServicesData.ambulanceService.regdId}</p>
                                        <p>Contact No: {RegisteredServicesData.ambulanceService.contactNo}</p>
                                    </div>
                                    <div className='bg-white p-4 m-4 rounded-xl text-xl font-semibold'>
                                        <p> RegdId: {RegisteredServicesData.bloodBank.regdId}</p>
                                        <p>Contact No: {RegisteredServicesData.bloodBank.contactNo}</p>
                                    </div>
                                    <div className='bg-white p-4 m-4 rounded-xl text-xl font-semibold'>
                                        <p>RegdId: {RegisteredServicesData.oxygenService.regdId}</p>
                                        <p>Contact No: {RegisteredServicesData.oxygenService.contactNo}</p>
                                    </div> */}
                                </div>
                            </div>) : pageNo === 3 ?
                                (<div className='h-full w-[80vw] ml-[20vw]'>
                                    <p className='text-2xl font-semibold text-center m-4'>Registered Ambulances</p>
                                    <div className='bg-gray-100 w-full h-[86vh]'>
                                        {/****************List of registered ambulances*******************/}
                                    </div>
                                </div>) :
                                (<div className='h-full w-[80vw] ml-[20vw]'>
                                    <p className='text-2xl font-semibold text-center m-4'>Enquiries</p>
                                    <div className='bg-gray-100 w-full h-[86vh]'>
                                        {/****************List of related enquiries*******************/}
                                    </div>
                                </div>)
                }
            </div>
        </div >
    )
}

export default HospitalPanel