import React from 'react'

function ServiceCards({title}) {
  return (
    <div className='bg-gray-100 w-[20vw] h-[5vh] px-2 py-1 rounded-2xl text-xl 
    hover:scale-105 hover:bg-gray-300 flex justify-center font-semibold'>
        {title}
    </div>
  )
}

export default ServiceCards