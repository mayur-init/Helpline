import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function LandingPage() {

  const [location, setLocation] = useState();

  useEffect(() =>{},[location]);

  function getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async function(position){
          let longitude = position.coords.longitude;
          let lattitude = position.coords.latitude;

           let API_KEY = 'AIzaSyAzWFkFBXpW0GB4xYZuZs910yDm6iavKf0';

           //console.log(longitude + " " + lattitude);

           let config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lattitude}%${longitude}&radius=1500&type=Hospital&keyword=private&key=${API_KEY}`,
            headers: {"Access-Control-Allow-Origin":'*', "Access-Contorol-Allow-Methods":'GET' }
           }

           try {
            let response = await axios(config);
            console.log(JSON.stringify(response.data));

           } catch (err) {
            console.log(err);
           }
           
           setLocation({
            "lattitude": lattitude,
            "longitude": longitude,
           });
      });

    }else{
      console.log('navigation not supported by the browser');
    }
  }

  return ( 
    <div className='bg-gray-200 flex flex-col justify-evenly'>
        <Navbar/>
        <div className='min-h-[90vh] flex justify-center'>
          <div className='mt-[10vh] flex flex-col items-center'>
            <h1 className='text-4xl font-semibold text-gray-600 m-4'>Find your location</h1>
            {!location?<p className='flex justify-center'><button onClick={getLocation} className='btn'>My location</button></p>
             :<div>
              <p className='text-xl'>{`lattitude: ${location.lattitude}, longitude: ${location.longitude}`}</p>
             </div>
          }
          </div>
          {/* <p className='text-3xl font-medium text-gray-500'>landing page content</p> */}
        </div>
        <Footer/>
    </div>
  )
}

export default LandingPage