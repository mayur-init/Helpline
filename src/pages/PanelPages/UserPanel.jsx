import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {globalStateContext} from '../../contexts/globalStateContext'

function UserPanel() {

    const {userName, isUserLoggedIn} = useContext(globalStateContext);
    const navigate = useNavigate();

    useEffect(() =>{
        if(!isUserLoggedIn){
            toast.error('You are not logged in, log in first');
            navigate('/login' , {replace: true});
        }
    })

    return (
        <div>
            <div name='panel-nav' className='h-[6vh] w-auto flex h justify-center p-3 border-b-2 border-gray-300'>
                user-panel-nav
                <div className='ml-auto'>
                    {userName}
                </div>
            </div>
            <div className='flex'>
                <div name="sideBar" className='w-[20vw] h-screen border-r-2 border-gray-300 flex flex-col justify-center items-center'>
                    side-bar
                </div>
                <div name='mainContent' className='w-[50vw] h-screen border-r-2 border-gray-300 flex flex-col justify-center items-center'>
                    main-content
                </div>
                <div name='rightbar' className='w-[30vw] h-screen flex flex-col justify-center items-center'>
                    right-bar
                </div>
            </div>
        </div>
    )
}

export default UserPanel