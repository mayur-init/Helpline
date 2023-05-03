import React, { useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import classNames from 'classnames';
import { HiChevronDown } from 'react-icons/hi2'

function QueryTypeDropdown({ title, options, setQueryType }) {

    const [isActive, setActive] = useState(false);
    const titleRef = title;

    return (
        <div>
            <button className='flex justify-start py-1 text-md w-full text-semibold text-gray-600 px-4 border-2 border-gray-600 rounded-2xl my-2 hover:text-violet-600' onClick={() => setActive(!isActive)}>
                {title}
                <HiChevronDown className='mt-2 ml-1 text-sm' />
            </button>
            <div className={classNames("absolute transition duration-100 bg-white p-2 m-8 mt-1 w-[16vw] rounded-xl shadow-2xl", {
                block: isActive,
                hidden: !isActive
            })}>
                {options.map((option) => <button key={option.id} ><div className={classNames('text-gray-600 border-b-2 border-gray-100 text-start px-4 w-[15vw] py-2 hover:bg-violet-500 hover:text-white rounded-md')} onClick={() => { setQueryType(option.id); setActive(false)}} >
                    {option.label}
                </div></button>)}
            </div>
        </div>
    )
}

export default QueryTypeDropdown