import React,{useState,useEffect} from 'react'

function AmbulanceServiceHero() {
  const [sentence1, setsentence1] = useState(false);
  const [sentence2, setsentence2] = useState(false);
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setsentence1(true);
    }, 500);

    setTimeout(() => {
      setsentence2(true);
    }, 1000);
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/ambulanceservice')
      .then(res => res.json())
      .then(data => setAmbulances(data))
      .catch(error => console.log(error));
  }, []);
  return (
   <div>
    { /* Hero Page Starts */}
    <div className='w-full h-[100vh] bg-white  flex flex-col justify-between'>
                {/* Hero Page Start */}
                <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                    <div>
                        <img className='h-[100vh] mix-blend-multiply' src={'assets/img7.webp'} alt="/" />
                    </div>
                    <div className='flex flex-col justify-center md:items-start mt-[8vh] w-full px-12'>
                        <p className={`text-3xl md:text-4xl font-semibold text-gray-400 transform transition-all duration-1000 ${sentence1 ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'}`}>Your One Step Solution For 24*7 Ambulance Service</p>
                        <h1 className={`py-3 text-5xl md:text-7xl font-bold text-gray-800 hover:text-red-600 transform transition-all duration-1000 ${sentence2 ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>At Your Doorstep!</h1>
                    </div>
                </div>
    </div>
    { /* Hero Page Ends */}

    {/*OxygenProvider Details Start*/}
    <h1 className='text-4xl font-bold my-12 text-gray-800 text-center '>Nearby Ambulance Services </h1>
        
        <div className='w-auto flex flex-col justify-items-center mx-5 mb-[10vh]'>
        {
            ambulances.map((item) => {
                const { _id, providerName, address, regdId  ,email, contactNo} = item;
                return (
                    <div className="min-h-[10vh] w-[60vw] mx-auto bg-white my-4 py-5 px-[5vw] rounded-3xl shadow-xl" key={_id}>
                            <h1 className="font-bold text-2xl text-gray-600 my-2">{providerName}</h1>
                            <h2 className="text-xl my-2 font-semibold">Contact No: { contactNo}</h2>
                            <h1 className='text-xl my-2 font-semibold'>Address: {address}</h1>
                            {/* <h2 className="text-xl my-3 font-semibold">Registration No: {regNo}</h2>
                            <h2 className="text-xl my-3 font-semibold">Email: {email}</h2> */}
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