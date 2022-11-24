import React,{ useState, useEffect } from 'react'

const Hero = () => {

  const [location, setLocation] = useState();
  useEffect(() => { }, [location]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        let longitude = position.coords.longitude;
        let lattitude = position.coords.latitude;

        //console.log(longitude + " " + lattitude);

        try {

          let data = {
            lattitude,
            longitude,
          }

          let config = {
            method: 'get',
            url: 'http://localhost:5000/getNearby',
            headers: {},
            data: data,
          }

          let response = await axios.request(config);
          if(response.data.error_message){
            console.log(response.data.error_message);
          }else{
            console.log(response.data);
          }
          

        } catch (err) {
          console.log(err);
        }

        setLocation({
          "lattitude": lattitude,
          "longitude": longitude,
        });
      });

    } else {
      console.log('Geolocation navigation not supported by your browser');
    }
  }


  return (
    <div name='home' className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Ambulance Booking Service</h1>
                <div className='min-h-[90vh] flex justify-center'>
        
        <div className='mt-[10vh] flex flex-col items-center'>
          {!location ? <p className='flex justify-center'><button onClick={getLocation} className='btn'>My location</button></p>
            : <div>
              <p className='text-xl'>{`lattitude: ${location.lattitude}, longitude: ${location.longitude}`}</p>
            </div>
          }
        </div>
         
      </div>
      
               
            </div>
            <div>
                <img className='w-full' src={'assets/ambulance.png'} alt="/" />
            </div>
            
        </div>
    </div>
  )
}

export default Hero