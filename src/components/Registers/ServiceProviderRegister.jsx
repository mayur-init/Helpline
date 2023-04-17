import React, {useState} from 'react';
import axios from 'axios';
import RegisterFormDropdown from '../Dropdowns/RegisterFormDropdown';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ServiceProviderRegister() {

    const options  = [
        {label: 'Ambulance Service Provider', id: 1},
        {label: 'Blood Bank Service Provider', id: 2},
        {label: 'Oxygen Cylinder Provider', id: 3}
      ]

    const [formNo, setFromNo] = useState(0);

    const [ServiceProviderName, setServiceProviderName] = useState('');
    const [RegdNo, setRegdNo] = useState('');
    const [Email, setEmail] = useState('');
    const [ContactNo, setContactNo] = useState('');
    const [Address, setAddress] = useState('');
    const navigate = useNavigate();

    const util = async() =>{

        const Data = {
            ServiceProviderName,
            RegdNo,
            Email,
            ContactNo,
            Address,
        }

        console.log(Data);

        if(formNo === 1 ){
            try {
                const response = await axios.post('http://localhost:5000/api/ambulance', Data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                      }
                });
                console.log("Data sent");
              } catch(error) {
                console.log(error);
              } 
        }else if(formNo === 2){
            try {
                const response = await axios.post('http://localhost:5000/api/bloodbank', Data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                      }
                });
                console.log("Data sent");
              } catch(error) {
                console.log(error);
              } 
        }else if(formNo === 3){
            try {
                const response = await axios.post('http://localhost:5000/api/oxygencylinder', Data, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                      }
                });
                console.log("Data sent");
              } catch(error) {
                console.log(error);
              } 
        }
         
        // console.log(formNo);

        setServiceProviderName('');
        setRegdNo('');
        setEmail('');
        setContactNo('');
        setAddress('');

        toast.success(`Welcome ${ServiceProviderName}`)
        if(formNo === 1){
          navigate('/ambulance-service-provider-panel', {replace: true});
        }else if(formNo === 2){
          navigate('/blood-bank-service-provider-panel', {replace: true});
        }else if(formNo === 3){
          navigate('/oxygen-cylinder-provider-panel', { replace: true });
        }
    }

    return (
        <div className='rounded-xl shadow-xl p-4 min-h-max'>
            <h1 className='text-gray-600 text-3xl font-bold my-[4vh] flex justify-center hover:text-violet-600'>Register Service</h1>
            <div className='flex flex-col w-[50vh] h-auto mt-[8vh] mb-[2vh]'>
                <RegisterFormDropdown title={'Register as'} options={options} setFromNo={setFromNo}/>
                <input type='text' onChange={(e) => { setServiceProviderName(e.target.value) }} value={ServiceProviderName} placeholder='Service Provider Name' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setRegdNo(e.target.value) }} value={RegdNo} placeholder='Regd No' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setEmail(e.target.value) }} value={Email} placeholder='Email' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setContactNo(e.target.value) }} value={ContactNo} placeholder='Contact No' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <input type='text' onChange={(e) => { setAddress(e.target.value) }} value={Address} placeholder='Address' className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'></input>
                <p className='flex justify-end'><button onClick ={() => {util()}} className='btn w-[100px] m-2'>Submit</button></p>
            </div>
        </div>
    )
}

export default ServiceProviderRegister