import React, { useContext, useEffect, useState, useRef } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { globalStateContext } from '../../contexts/globalStateContext'
import { HiArrowSmallLeft, HiArrowSmallRight, HiBars3, HiXMark } from 'react-icons/hi2'
import QueryTypeDropdown from '../../components/Dropdowns/QueryTypeDropdown';


function UserPanel() {

    const { userName, userId, userMongoId, isUserLoggedIn, setUserLoggedIn, setUserMongoId } = useContext(globalStateContext);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    var [pageNo, setPageNo] = useState(1);
    const [queryType, setQueryType] = useState(0);
    const [query, setQuery] = useState('');

    const [allPostedQueries, setAllPostedQueries] = useState([]);

    const options = [
        { label: 'Blood bank query', id: 1 },
        { label: 'oxygen cylinder query', id: 2 },
        { label: 'other...', id: 3 }
    ]

    const EnquiryId = useRef();

    const enquiryData = {
        EnquiryId,
        UserId: userMongoId,
        EnquiryType: queryType,
        Enquiry: query,
    }

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
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId.toUpperCase()}`);
        // console.log(res.data[0]);
        setUserData(res.data[0]);
    }


    const handleLogout = () => {
        setUserLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/', { replace: true });
    }

    const handleFillData = async (regdId) => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`);
        // console.log(res.data[0]);
        setUpdateData(res.data[0]);
    }

    //Delete User Details
    const handleDelete = async (regdId) => {
        try {
            // console.log(regdId);
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api//users/${userId}`);

            localStorage.clear();
            setUserMongoId(null);

            handleLogout();
        } catch (err) {
            console.log(err);
        }

    }

    const handleUpdate = async () => {
        try {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/api//users/${userId}`, updateData).then((response) => {
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

    const handleClick = async () => {
        if (queryType === 0 || query === '') {
            toast.error('Write some query first')
        } else {
            try {
                await generateRegdId();
                // console.log(enquiryData);
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/enquiry`, enquiryData, {
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
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/generateregdid`, { IdType: 'ENQR' });
        enquiryData.EnquiryId = response.data.generatedId;
    }

    const getAllPostedQueries = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/enquiry/${userMongoId}`);
        setAllPostedQueries(response.data);
        // console.log(response.data);
    }
    
    if(userMongoId !== null){
        getAllPostedQueries();
    }

    return (
        <div className="" id='main'>
            <div name='panel-nav' className='h-[6vh] fixed w-auto flex justify-center py-2 px-3 border-b-2 border-gray-200 sticky top-0 z-50'>
                <p className='text-xl font-semibold hover:text-violet-500'>Helpline</p>
                <div className='ml-auto flex'>
                    <p className='border-gray-300 border-2 rounded-xl px-2 h-[27px]'>{userName}</p>
                    <button className='mx-2 font-semibold underline hover:text-violet-600' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className={open ? 'bg-gray-200 h-screen w-[70vw] md:w-[25vw] border-gray-200 border-r-2 fixed duration-500' : 'bg-gray-200 h-screen w-[10vw] md:w-[25vw] fixed duration-500'}>
                    {/*****************************Side-bar************************************/}
                    <div className='flex flex-col w-full h-full justify-start item-end py-2 relative'>
                        <div className='flex justify-end'>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(1) }}><HiArrowSmallLeft /></button>
                            <button className='bg-gray-100 p-2 rounded-2xl hover:bg-white m-2' onClick={() => { setPageNo(2) }}><HiArrowSmallRight /></button>
                            <button className='md:hidden p-2' onClick={() => { setOpen(!open) }} >{open ? <HiXMark size={30} /> : <HiBars3 size={30} />}</button>
                        </div>
                        {/*****************Query form-box*********************/}
                        {pageNo === 1 ?
                            (<div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto mt-[10vh]' : 'hidden md:flex flex-col bg-white p-4 rounded-xl w-[20vw] mx-auto mt-[10vh]'}>
                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Change Credentials</p>
                                <input type='text' placeholder='User name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.userName} onChange={(e) => { setUpdateData({ ...updateData, userName: e.target.value }) }}></input>
                                <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.contactNo} onChange={(e) => { setUpdateData({ ...updateData, contactNo: e.target.value }) }}></input>
                                <input type='text' placeholder='Location' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2' value={updateData.location} onChange={(e) => { setUpdateData({ ...updateData, location: e.target.value }) }}></input>
                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={() => handleUpdate(userData.regdId)}>Change</button></p>
                            </div>) :

                            (<div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto my-8 duration-500' : 'hidden md:flex flex-col bg-white rounded-xl p-4 w-[20vw] mx-auto my-8'}>
                                <p className='text-center mt-2 mb-4 text-xl font-semibold'>Write your queries</p>
                                <QueryTypeDropdown title='Select query type' options={options} setQueryType={setQueryType} />
                                <textarea type='text' placeholder='Query' className='border-2 h-[10vh] w-[45vw] md:w-[17.8vw] border-gray-600 rounded-xl px-3 py-1 my-2' value={query} onChange={(e) => { setQuery(e.target.value) }}></textarea>
                                <p className='flex justify-end'><button className='btn w-[100px] m-2' onClick={handleClick}>Submit</button></p>
                            </div>)
                        }
                    </div>
                </div>
                {/****************Query-box*******************/}
                {pageNo === 1 ?
                    (<div className='h-full md:h-[93vh] w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                        <p className='text-2xl font-semibold text-center m-4'>Personal Information</p>
                        <div className='bg-gray-100 w-full h-[86vh] p-4'>
                            {/****************Personal Information*******************/}
                            {
                                userData !== null ?
                                    (
                                        <div>
                                            <p className='md:text-xl m-2'><span className='font-semibold'>User Name: </span>{userData.userName}</p>
                                            <p className='md:text-xl m-2'><span className='font-semibold'>Regd Id: </span>{userData.regdId}</p>
                                            <p className='md:text-xl m-2'><span className='font-semibold'>Contact No: </span>{userData.contactNo}</p>
                                            <p className='md:text-xl m-2'><span className='font-semibold'>Location: </span>{userData.location}</p>
                                            <div className="my-6">
                                                <button className='btn' onClick={() => { handleFillData(userData.RegdId); setOpen(true) }}>Update</button>
                                                <button className='btn' onClick={() => handleDelete(userData.RegdId)}>Delete</button>
                                            </div>
                                        </div>
                                    ) : null
                            }
                        </div>
                    </div>) :
                    (<div className='h-full md:h-auto w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                        <p className='text-2xl font-semibold text-center m-4'>Your Queries</p>
                        <div className='bg-gray-100 w-full h-auto relative p-4'>
                            <div>
                            {
                                allPostedQueries.map((query) => {
                                    const { enquiryId, enquiry, _id } = query;
                                    return (
                                        <div className='bg-white p-4 m-4 rounded-xl text-md md:text-xl font-semibold' key={_id}>
                                            <p>EnquiryId: <span className='font-normal'>{enquiryId}</span></p>
                                            <p>Enquiry <span className='font-normal'>{enquiry}</span></p>
                                            <p className='flex justify-end my-1'><button className='btn'>Delete</button></p>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserPanel