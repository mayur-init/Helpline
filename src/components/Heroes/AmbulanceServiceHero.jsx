import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { SlArrowDown,SlArrowUp } from "react-icons/sl";

function AmbulanceServiceHero({location}) {
  const [sentence1, setsentence1] = useState(false);
  const [sentence2, setsentence2] = useState(false);
  const [ambulances, setAmbulances] = useState([]);


  // const [RegisteredAmbulances, setRegisteredAmbulances] = useState([]);
  // const [click,setClick] = useState(true); //15/05


  useEffect(() => {
    setTimeout(() => {
      setsentence1(true);
    }, 500);

    setTimeout(() => {
      setsentence2(true);
    }, 1000);
  }, []);

  useEffect(() => {

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/ambulanceservice/${location}`)
      .then(res => res.json())
      .then(data => setAmbulances(data))
      .catch(error => console.log(error));
      console.log(location);

  }, []);
  // const getAllRegisteredAmbulanceData = async (regdId) => {
  //   try {
  //       const res = await axios.get(`http://localhost:5000/api/ambulances/${regdId}`);
  //       console.log(ambulances.regdId);
  //       setRegisteredAmbulances(res.data);
  //   } catch (err) {
  //       console.log(err);
  //   } //15/05
//}
  return (
    <div>
      { /* Hero Page Starts */}
      <div className='hidden min-h-screen flex flex-col justify-center items-center bg-white' id='hero'>
        {/* Hero Page Start */}
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
          <div>
            <img className='w-[80vh] h-[70vh]rounded-md' src={'assets/img7.webp'} alt="/" />
          </div>
          <div className='flex flex-col justify-center md:items-start mt-0 md:mt-[8vh] w-full px-12'>
            <p className={`text-3xl md:text-4xl font-semibold text-gray-400 transform transition-all duration-1000 ${sentence1 ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'}`}>Your One Step Solution For 24*7 Ambulance Service</p>
            <h1 className={`py-3 text-5xl md:text-7xl font-bold text-gray-800 hover:text-red-600 transform transition-all duration-1000 ${sentence2 ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>At Your Doorstep!</h1>
          </div>
        </div>
      </div>
      { /* Hero Page Ends */}

      {/*OxygenProvider Details Start*/}
      <h1 className='text-3xl font-bold my-12 text-gray-800 text-center '>Nearby Ambulance Services </h1>

      <div className='w-auto flex flex-col justify-items-center mx-5 mb-[10vh]'>
        {
          ambulances.map((item) => {
            const { _id, providerName, address, regdId, email, contactNo } = item;
            //15/05

            return (
              <div className="min-h-[6vh] w-[85vw] md:w-[60vw] mx-auto bg-white my-3 md:my-4 py-4 px-[5vw] rounded-3xl shadow-xl" key={_id}>
                <h1 className="font-bold text-xl text-gray-700 my-2">{providerName}</h1>
                <h2 className="text-xl my-2 font-semibold">Contact No: {contactNo}</h2>
                <h1 className='text-xl my-2 font-semibold'>Address: {address}</h1>
                
                {/* <h2 className="text-xl my-3 font-semibold">Registration No: {regNo}</h2>
                            <h2 className="text-xl my-3 font-semibold">Email: {email}</h2> */}
                             {/* {click &&
                                    RegisteredAmbulances.map((ambulance) => {
                                        const { _id, driverName, driverContactNo } = ambulance;
                                        return (
                                            <div className='flex flex-col bg-white pt-4 rounded-xl text-md md:text-xl font-semibold' key={_id}>
                                                <p>Driver Contact No: <span className='font-normal'>{driverContactNo}</span></p>
                                                
                                            </div>
                                        )
                                    })
                                }
                                
                                <div className='flex justify-end'>
                                <button onClick={()=>{setClick(!click)}}>{click ? <SlArrowUp size={20}/>:<SlArrowDown size={20}/> }</button>
                                </div>  */}
                                
              </div>

            )
          })
        }
      </div>
      {/*OxygenProvider Details Ends*/}

    </div>
  )
}

export default AmbulanceServiceHero