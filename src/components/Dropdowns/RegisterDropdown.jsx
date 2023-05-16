import React, {useState} from 'react'
import { HashLink } from 'react-router-hash-link'
import classNames from 'classnames';
import {HiChevronDown} from 'react-icons/hi2'


export default function RegisterDropdown({screen}) {

  const options  = [
    {lable: 'user', href: '/#userRegister'},
    {lable: 'service provider', href: '/register'}
  ]

  var style
  if(screen !== 'sm'){
    style = 'underline hover:text-violet-600';
  }else{
    style = 'hover:text-white'
  }
  const [isActive, setActive] = useState(false);

  return (
    <div >
      <button className={classNames('flex justify-center text-md text-semibold text-gray-600', style)} onClick={() => setActive(!isActive)}>Register<HiChevronDown className='mt-2 ml-1 text-sm'/></button>
      <div className={classNames("absolute transition ease-out duration-100 bg-white p-2 my-8 md:my-1 w-[44vw] md:w-[15vw] border-gray-200 border-2 rounded-xl shadow-md", {
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

