import React, { useState, useEffect } from 'react'

const LandingHero = () => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sentence = 'Services';

  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const intervalId = setInterval(() => {
      setText(sentence.substring(0, index));
      index++;
      if (index > sentence.length) {
        clearInterval(intervalId);
      }
    }, 300);
  }, []);

  return (
    <div className='w-full h-[92vh] bg-white flex flex-col justify-between' id='hero'>
      <div className='grid md:grid-cols-2 mx-[35vh] mt-[18vh]'>
        <div className='flex flex-col justify-center md:items-start w-full mt-[18vh]'>
          <h1 className='p-2 text-5xl md:text-6xl text-gray-400 font-bold'>Book Your</h1>
          <h1 className='px-6 text-5xl md:text-8xl font-bold hover:text-violet-600'>  {isVisible && (
          <>
            {text}
          </>
        )}</h1>
        </div>
        <div className='w-[90vh]'>
          <img className='w-[80vh] h-[50vh] rounded-md' src={'assets/img1.jpg'} alt="/" />
        </div>
      </div>
    </div>
  )
}

export default LandingHero;