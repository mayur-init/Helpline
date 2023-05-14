import React, { useContext, useEffect,useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {globalStateContext} from '../../contexts/globalStateContext'
import { HiBars3, HiXMark } from 'react-icons/hi2'
function UserPanel() {

    const {userName, isUserLoggedIn, setUserLoggedIn} = useContext(globalStateContext);
    const navigate = useNavigate();
    const [open,setOpen] = useState(true);
    useEffect(() =>{
        if(!isUserLoggedIn){
            toast.error('You are not logged in, log in first');
            navigate('/login' , {replace: true});
        }
    }, [])

    const handleLogout = () => {
        setUserLoggedIn(false);
        toast.success('Loggged out successfully');
        navigate('/login', { replace: true });
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
                <div className={open ?'bg-gray-200 h-screen w-[70vw] md:w-[25vw] border-gray-200 border-r-2 fixed duration-500':'bg-gray-200 h-screen w-[10vw] md:w-[25vw] fixed duration-500'}>
                    <div className='flex justify-end'>
                       <button className='md:hidden p-2' onClick= {()=>{setOpen(!open)}} >{open ? <HiXMark size={30}/> : <HiBars3 size={30}/>}</button>                    
                    </div>
                    {/*****************************Side-bar************************************/}
                    <div className='flex flex-col w-full h-full justify-start item-end py-4 relative'>
                        {/*****************Query form-box*********************/}
                        <div className={open ? 'flex flex-col bg-white rounded-xl p-4 w-[60vw] md:w-[20vw] mx-auto mt-[10vh]':'hidden md:block bg-white p-4 rounded-xl w-[20vw] mx-auto mt-[10vh]'}>
                           <p className='text-center mt-2 mb-4 text-xl font-semibold'>Change Credentials</p>
                            <input type='text' placeholder='User name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                            <input type='text' placeholder='Contact' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                            <input type='text' placeholder='Password' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                            <p className='flex justify-end'><button className='btn w-[100px] m-2'>Change</button></p>
                        </div>
                    </div>
                </div>
                {/****************Query-box*******************/}
                <div className='h-full w-full md:w-[80vw] ml-[10vw] md:ml-[25vw]'>
                    <p className='text-2xl font-semibold text-center m-4'>Personal Information</p>
                    <div className='bg-gray-100 w-full h-[86vh]'>
                        {/****************Personal Information*******************/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPanel