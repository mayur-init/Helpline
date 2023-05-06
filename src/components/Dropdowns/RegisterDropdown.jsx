import React, {useState} from 'react'
import { HashLink } from 'react-router-hash-link'
import classNames from 'classnames';
import {HiChevronDown} from 'react-icons/hi2'


export default function RegisterDropdown() {

  const options  = [
    {lable: 'user', href: '/#userRegister'},
    {lable: 'service provider', href: '/register#registerForm'}
  ]

  const [isActive, setActive] = useState(false);

  return (
    <div>
      <button className='flex justify-center text-md text-semibold text-gray-600 underline hover:text-violet-600' onClick={() => setActive(!isActive)}>Register<HiChevronDown className='mt-2 ml-1 text-sm'/></button>
      <div className={classNames("absolute transition ease-out duration-100 bg-white p-2 m-8 mt-3 w-56 rounded-xl shadow-2xl", {
                block: isActive,
                hidden: !isActive
            })}>
            {options.map((option) => <HashLink smooth to={option.href} key={option.href}><div className={classNames('text-gray-600 border-b-2 border-gray-100 text-start px-4 py-2 hover:bg-violet-500 hover:text-white rounded-md')} onClick={()=> {setActive(false)}} >
              {option.lable}
            </div></HashLink>)}
        </div>
    </div>
  )
}

