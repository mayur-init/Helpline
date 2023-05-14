import React from 'react'

function RegisterPageHero() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-white'>
         <div className='grid md:grid-cols-2 mx-0 md:mx-[35vh] mt-0 md:mt-[4vh]'>
          <img src='assets/img7.webp' className='w-[80vw] h-[70vw] md:w-[100vw] md:h-[100vh]'></img>
          <div className='flex flex-col md:justify-center mx-auto mb-[12vh] md:mb-0 md:mt-[10vh]'>
            <p className='text-3xl md:text-4xl font-bold self-center w-[50vw] md:w-[30vw] p-2  hover:text-violet-600'>By registering your service</p>
            <p className='text-3xl md:text-4xl font-bold self-center w-[50vw] md:w-[30vw] p-2  hover:text-violet-600'>your can help us to reach </p>
            <p className='text-3xl md:text-4xl font-bold self-center w-[50vw] md:w-[30vw] p-2  hover:text-violet-600'>to more needful</p>
          </div>
          </div>
        </div>
  )
}

export default RegisterPageHero