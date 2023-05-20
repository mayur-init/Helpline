import React, { useContext, useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { globalStateContext } from '../../contexts/globalStateContext'
import { HiArrowSmallLeft, HiArrowSmallRight, HiBars3, HiXMark } from 'react-icons/hi2'


function HospitalPanel() {

    const { RegdId } = useParams();
    const navigate = useNavigate();
    const { isProviderLoggedIn, setProviderLoggedIn } = useContext(globalStateContext);
    const [providerData, setProviderData] = useState(null);
    const [open, setOpen] = useState(false);
    const [click, setClick] = useState(false);
    const [updateData, setUpdateData] = useState({
        providerName: "",
        contactNo: "",
        email: "",
        address: "",
        password: "",
    });
    var [pageNo, setPageNo] = useState(1);

    //ambulance states
    const [DriverName, setDriverName] = useState('');
    const [DriverContactNo, setDriverContactNo] = useState('');
    const [ambulanceServiceId, setAmbulanceServiceId] = useState(null);
    const [registeredAmbulances, setRegisteredAmbulances] = useState([]);
    // var pageNo = useRef(1);

    //
    const [BloodBankContactNo, setBloodBankContactNo] = useState('');
    const [OxygenSerivceContactNo, setOxygenServiceContactNo] = useState('');
    const [AmbulnceServiceContactNo, setAmbulanceServiceContactNo] = useState('');
    const [RegisteredServicesData, setRegisteredServiceData] = useState();
    const [enquiryData, setEnquiryData] = useState(null);

    // var RegisteredServicesData = useRef(null);

    useEffect(() => {
        if (!isProviderLoggedIn) {
            toast.error('You are not logged in, log in first');
            navigate('/login', { replace: true });
        }
        collectProviderData();
    }, [])

    const collectProviderData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/${RegdId.toUpperCase()}`);
        // console.log(res.data[0]);
        setProviderData(res.data[0]);
        // console.log(providerData);
    }

    const handleLogout = () => {
        setProviderLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/', { replace: true });
    }

    const handleAmbulanceSubmit = async (e) => {
        e.preventDefault();

        if (ambulanceServiceId === null) {
            toast.error('No Ambulance Service Registered');
        } else {
            if (DriverName === "" || DriverContactNo === "") {
                toast.error("All fields are mendatory");
            }

            const ambulanceData = {
                DriverName,
                ParentRegdId: ambulanceServiceId,
                DriverContactNo
            }
            // console.log(ambulanceData);
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ambulance`, ambulanceData);
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
                const generatedId = await generateRegdId("BLOOD");
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
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/bloodbank`, Data, {
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
        getAllRegistedServicesData();
    }

    const handleOxygenServiceSubmit = async (e) => {
        e.preventDefault();
        if (RegisteredServicesData !== null && RegisteredServicesData.oxygenService.regdId !== null) {
            toast.error("Oxygen service already registered");
        } else {
            if (OxygenSerivceContactNo === "") {
                toast.error("Oxygen service contact is required");
            } else {
                const generatedId = await generateRegdId("OXYG");
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
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/oxygencylinder`, Data, {
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
        getAllRegistedServicesData();
    }

    const handleAmbulnceServiceSubmit = async (e) => {
        e.preventDefault();
        // console.log(providerData);
        // console.log(RegisteredServicesData);
        if (RegisteredServicesData !== null && RegisteredServicesData.ambulanceService.regdId !== null) {
            toast.error("Ambulance service already registered");
        } else {
            if (AmbulnceServiceContactNo === "") {
                toast.error("Ambulance service contact is required");
            } else {
                const generatedId = await generateRegdId("AMBU");
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
                    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/ambulanceservice`, Data, {
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
        getAllRegistedServicesData();
    }

    const generateRegdId = async (ProviderType) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/generateregdid`, { IdType: ProviderType });
            // console.log(response.data.generatedId);
            return response.data.generatedId;
        } catch (err) {
            console.log(err);
        }

    }

    const getAllRegistedServicesData = async () => {
        try {
            if (providerData !== null) {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api//hospital/getallservices/${providerData.regdId}`);
                setRegisteredServiceData(response.data);
                // console.log(response.data);
                // console.log(RegisteredServicesData);
                if (RegisteredServicesData !== null)
                    setAmbulanceServiceId(response.data.ambulanceService.regdId);

                // console.log(response.data.ambulanceService.regdId);
            }
        } catch (err) {
            console.log(err);
        }
    }

    getAllRegistedServicesData();

    //Delete Hospital entities details
    const deleteData = async (regdId) => {
        try {
            var response = null;
            if (regdId.startsWith("AMBU")) {
                response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api//ambulanceservice/${regdId}`);
            } else if (regdId.startsWith("BLOOD")) {
                response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api//bloodbanks/${regdId}`);
            }
            else if (regdId.startsWith("OXYG")) {
                response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api//oxygencylinders/${regdId}`);
            }

            //    console.log(response);
            if (response.data.msg === "Success") {
                toast.success("Deleted successfully");
            } else {
                toast.error("Something went wrong!");
            }
        } catch (err) {
            console.log(err);
        }
    }
    // console.log(RegisteredServicesData);
    const handleFillData = async (regdId) => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/hospital/${regdId}`);
        // console.log(res.data[0]);
        setUpdateData(res.data[0]);
    }
    //Delete Hospital Details
    const handleDelete = async (regdId) => {
        try {
            console.log(regdId);
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api//hospital/${regdId}`);
            handleLogout();
        } catch (err) {
            console.log(err);
        }

    }
    //Update Hospital's Information
    const handleUpdate = async (regdId) => {
        try {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/api//hospital/${regdId}`, updateData).then((response) => {
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

    const getAllRegisteredAmbulances = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/ambulances/${ambulanceServiceId}`);
        // console.log(res.data);
        setRegisteredAmbulances(res.data);
    }
    getAllRegisteredAmbulances();

    const getEnquiries = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getalllocationenquiries/${providerData.address}`);
        // console.log(res.data);
        setEnquiryData(res.data);
    }
    if (enquiryData === null) {
        getEnquiries();
    }
    const handleEnquiryDelete = async (enquiryId) => {
        try {
         const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api//removequery/${enquiryId}`);
         if (response.data.msg === "success") {
             toast.success("Enquiry Deleted");
         } else {
             toast.error("Something went wrong!");
         }
         getEnquiries();
        } catch (error) {
         console.log(error);
        }
     }
    return (
        <div className="" id='main'>
            <div name='panel-nav' className='h-[6vh] w-auto flex h justify-center py-2 px-3 border-b-2 border-gray-200 sticky top-0 z-50'>
                <p className='text-xl font-semibold hover:text-violet-500'>Helpline</p>
                <div className=' hidden md:flex md:justify-start flex-row mx-4'>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={() => { setPageNo(1) }}>Home</button>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={() => { setPageNo(2) }}>Services</button>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={() => { setPageNo(3) }}>Ambulance</button>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={() => { setPageNo(4) }}>Enquiries</button>
                </div>
                <div className='invisible md:visible md:flex ml-auto'>
                    <p className='border-gray-300 border-2 rounded-xl px-2 h-[27px]'>{providerData !== null ? providerData.providerName : null}</p>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={handleLogout}>Logout</button>
                </div>

                {/* Responsive */}
                <div className="md:hidden flex w-9/12 justify-end right-0">
                    <button onClick={() => { setClick(!click) }}>{click ? <HiXMark size={25} /> : <HiBars3 size={25} />}</button>
                </div>
                <div className={click ? "border-2 broder-slate-300 absolute w-1/2 right-0 top-0 bg-white px-4 m-2 flex flex-col duration-1000 -z-10 rounded-md" : "hidden"}>
                    <ul>
                        <li className="border-b-2 border-gray-100  text-gray-600 p-3 rounded-md">
                            <p className='border-gray-300 border-2 rounded-xl px-2 h-[27px] w-[25vh] text-center'>{providerData !== null ? providerData.providerName : null}</p>
                        </li>
                        <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white  rounded-md" >
                            <button className='mx-2 font-semibold' onClick={() => { setPageNo(1) }}>Home</button>
                        </li>
                        <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md">
                            <button className='mx-2 font-semibold' onClick={() => { setPageNo(2) }}>Services</button>
                        </li>
                        <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md" >
                            <button className='mx-2 font-semibold' onClick={() => { setPageNo(3) }}>Ambulance</button>
                        </li>
                        <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md" >
                            <button className='mx-2 font-semibold' onClick={() => { setPageNo(4) }}>Enquiries</button>
                        </li>
                        <li className="border-b-2 border-gray-100  text-gray-600 p-3 hover:bg-violet-600  hover:text-white rounded-md" >
                            <button className='mx-2 font-semibold' onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>

                </div>
            </div>
            <div className='flex'>
                <div className={open ? 'bg-gray-200 h-screen w-[70vw] md:w-[25vw] border-gray-200 border-r-2 fixed duration-500' : 'bg-gray-200 h-screen w-[10vw] md:w-[25vw] fixed duration-500'}>
                    {/*****************************Side-bar************************************/}
                    <div className='flex flex-col w-full h-full justify-start item-center py-2 relative'>
                        {/*****************Query form-box*********************/}
                        <div className='flex justify-end'>
                            <button className='md:hidden p-2' onClick={() => { setOpen(!open) }} >{open ? <HiXMark size={30} /> : <HiBars3 size={30} />}</button>
                        </div>
                        {/**********************Add Services Forms*******************************/}
                        {

                        }
                        <div>
                            {
                                pageNo === 1 ?
                                    (<div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto mt-[10vh]' : 'hidden md:flex flex-col bg-white p-4 rounded-xl w-[20vw] mx-auto mt-[10vh]'}>
                                        <p className='text-center mt-2 mb-4 text-xl font-semibold'>Change Credentials</p>
                                        <input type='text' placeholder='Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.providerName} onChange={(e) => { setUpdateData({ ...updateData, providerName: e.target.value }) }}></input>
                                        <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.contactNo} onChange={(e) => { setUpdateData({ ...updateData, contactNo: e.target.value }) }}></input>
                                        <input type='text' placeholder='Email' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.email} onChange={(e) => { setUpdateData({ ...updateData, email: e.target.value }) }}></input>
                                        <input type='text' placeholder='Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.address} onChange={(e) => { setUpdateData({ ...updateData, address: e.target.value }) }}></input>
                                        <input type='text' placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.password} onChange={(e) => { setUpdateData({ ...updateData, password: e.target.value }) }}></input>
                                        <p className='flex justify-end'><button className='btn w-[100px] mx-2 my-1' onClick={() => handleUpdate(providerData.regdId)}>Submit</button></p>
                                    </div>) : pageNo === 2 ?
                                        (<div>
                                            <div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto my-8 md:m-0' : 'hidden md:flex flex-col bg-white rounded-xl p-4 w-[20vw] mx-auto my-8 md:my-1'}>
                                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Ambulance Service</p>
                                                <input type='text' placeholder='Dept Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setAmbulanceServiceContactNo(e.target.value) }}></input>
                                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleAmbulnceServiceSubmit}>Add</button></p>
                                            </div>
                                            <div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto my-8 md:my-1' : 'hidden md:flex flex-col bg-white rounded-xl p-4 w-[20vw] mx-auto my-8 md:my-3'}>
                                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Blood Bank</p>
                                                <input type='text' placeholder='Dept Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setBloodBankContactNo(e.target.value) }}></input>
                                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleBloodBankSubmit}>Add</button></p>
                                            </div>
                                            <div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto my-8 md:my-1' : 'hidden md:flex flex-col bg-white rounded-xl p-4 w-[20vw] mx-auto my-8 md:my-3'}>
                                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Add Oxygen Service</p>
                                                <input type='text' placeholder='Dept Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' onChange={(e) => { setOxygenServiceContactNo(e.target.value) }}></input>
                                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleOxygenServiceSubmit}>Add</button></p>
                                            </div>
                                        </div>) : pageNo === 3 ?
                                            (<div>
                                                <div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto my-8' : 'hidden md:flex flex-col bg-white rounded-xl p-4 w-[20vw] mx-auto my-8'}>
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
                        (<div className='h-full md:h-[93vh] w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
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
                                                <p className='text-xl m-2'><span className='font-semibold'>Contact: </span>{providerData.contactNo}</p>
                                                <p className='text-xl m-2'><span className='font-semibold'>Location: </span>{providerData.address}</p>
                                                {/* <p className='text-xl m-2'><span className='font-semibold'>Password: </span>{providerData.password}</p> */}
                                                <div className="my-6">
                                                    <button className='btn' onClick={() => { handleFillData(providerData.regdId); setOpen(true) }}>Update</button>
                                                    <button className='btn' onClick={() => handleDelete(providerData.regdId)}>Delete</button>
                                                </div>
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>) :
                        pageNo === 2 ?
                            (<div className='h-full md:h-[93vh] w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                                <p className='text-2xl font-semibold text-center m-4'>Registered Services</p>
                                <div className='bg-gray-100 w-full h-[86vh] p-4'>
                                    {/****************List of registered services*******************/}
                                    {
                                        RegisteredServicesData.ambulanceService.regdId !== null ?
                                            (
                                                <div className='bg-white p-4 m-4 rounded-xl text-xl font-semibold'>
                                                    <p>RegdId: <span className='font-normal'>{RegisteredServicesData.ambulanceService.regdId}</span></p>
                                                    <p>Contact No: <span className='font-normal'>{RegisteredServicesData.ambulanceService.contactNo}</span></p>
                                                    <p className='flex justify-end'><button className='btn float-right' onClick={() => deleteData(RegisteredServicesData.ambulanceService.regdId)}>Delete</button></p>
                                                </div>
                                            ) : null
                                    }
                                    {
                                        RegisteredServicesData.bloodBank.regdId !== null ?
                                            (
                                                <div className='bg-white p-4 m-4 rounded-xl text-xl font-semibold'>
                                                    <p> RegdId: <span className='font-normal'>{RegisteredServicesData.bloodBank.regdId}</span></p>
                                                    <p>Contact No: <span className='font-normal'>{RegisteredServicesData.bloodBank.contactNo}</span></p>
                                                    <p className='flex justify-end'><button className='btn' onClick={() => deleteData(RegisteredServicesData.bloodBank.regdId)}>Delete</button></p>
                                                </div>
                                            ) : null
                                    }
                                    {
                                        RegisteredServicesData.oxygenService.regdId !== null ?
                                            (
                                                <div className='bg-white p-4 m-4 rounded-xl text-xl font-semibold'>
                                                    <p>RegdId: <span className='font-normal'>{RegisteredServicesData.oxygenService.regdId}</span></p>
                                                    <p>Contact No: <span className='font-normal'>{RegisteredServicesData.oxygenService.contactNo}</span></p>
                                                    <p className='flex justify-end'><button className='btn float-right p-2' onClick={() => deleteData(RegisteredServicesData.oxygenService.regdId)}>Delete</button></p>
                                                </div>
                                            ) : null
                                    }
                                </div>
                            </div>) : pageNo === 3 &&
                            (<div className='h-full md:h-[93vh] w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                                <p className='text-2xl font-semibold text-center m-4'>Registered Ambulances</p>
                                <div className='bg-gray-100 w-full h-[86vh] p-4'>
                                    {/****************List of registered ambulances*******************/}
                                    {
                                        registeredAmbulances.map((ambulance) => {
                                            const { driverName, driverContactNo, _id } = ambulance;
                                            return (
                                                <div className='bg-white p-4 m-4 rounded-xl text-md md:text-xl font-semibold' key={_id}>
                                                    <p>Drive name: <span className='font-normal'>{driverName}</span></p>
                                                    <p>Driver Contact: <span className='font-normal'>{driverContactNo}</span></p>
                                                    <p className='flex justify-end my-1'><button className='btn'>Delete</button></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>)
                }
                {pageNo === 4 &&
                    (<div className='h-full w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                        <p className='text-2xl font-semibold text-center m-4'>Enquiries</p>
                        <div className='bg-gray-100 w-full h-full p-4'>
                            {/****************List of related enquiries*******************/}
                            {
                                    enquiryData !== null ? (
                                        enquiryData.map((query) => {
                                            const { enquiryId, enquiry, userId, _id } = query;
                                            return (
                                                <div className='bg-white p-4 m-4 rounded-xl text-md md:text-xl font-semibold' key={_id}>
                                                    <p>EnquiryId: <span className='font-normal p-1'>{enquiryId}</span></p>
                                                    <p>Enquiry: <span className='font-normal  p-1'>{enquiry}</span></p>
                                                    {
                                                        userId !== null ? (
                                                            <div>
                                                                <p>User name:<span className='font-normal  p-1'>{userId.userName}</span></p>
                                                                <p>Contact: <span className='font-normal  p-1'>{userId.contactNo}</span></p>
                                                            </div>
                                                        ) : null
                                                    }

                                                    <p className='flex justify-end my-1'><button className='btn' onClick={()=>{handleEnquiryDelete(enquiryId)}}>Resolve</button></p>
                                                </div>
                                            )
                                        })
                                    ) : null
                                }
                        </div>
                    </div>)}
            </div>
        </div >
    )
}

export default HospitalPanel