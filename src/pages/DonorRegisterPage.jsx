import React,{useState} from 'react'
import Navbar from '../components/Navbar'
//import { useNavigate } from 'react-router-dom';
function DonorRegisterPage() {
      const [name, setName] = useState('');
      const [city, setCity] = useState('');
      const [age, setAge] = useState('');
      const [contactNo, setContactNo] = useState('');
      const [bloodGroup, setBloodGroup] = useState('');
      const [state, setState] = useState('');
      //const navigate = useNavigate();
      const handleSubmit = () =>{
        const bloodDonorData = {
             name,
             age,
             contactNo,
             bloodGroup,
             city,
             state
        }
        console.log(bloodDonorData);
        setName('');
        setAge('');
        setContactNo('');
        setBloodGroup('');
        setCity('');
        setState('');
        //navigate('/blood');
      }
  return (
    
    <div>
        <Navbar/>
        <div className='relative'>
        <div className='absolute inset-0 w-full h-[92vh] bg-zinc-600 bg-opacity-75'>
            <div className=' mt-12'>
            <div className='flex flex-col justify-center w-[70%] md:w-[40%] h-auto m-auto bg-zinc-300 shadow-xl p-6 rounded-xl'>
                <h1 className='text-xl md:text-4xl font-bold text-center mb-8 mt-4'>Register For Donation</h1>
                <input type="text" placeholder='Enter Your Name' onChange={(e)=>{setName(e.target.value)}} value={name} className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'/>
                <input type="text" placeholder='Enter Your Age' onChange={(e)=>{setAge(e.target.value)}} value={age} className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'/>
                <input type="text" placeholder='Contact Number' onChange={(e)=>{setContactNo(e.target.value)}} value={contactNo} className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'/>
                <input type="text" placeholder='Blood Group' onChange={(e)=>{setBloodGroup(e.target.value)}} value={bloodGroup} className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'/>
                <input type="text" placeholder='City' onChange={(e)=>{setCity(e.target.value)}} value={city} className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'/>
                <input type="text" placeholder='State' onChange={(e)=>{setState(e.target.value)}} value={state} className='border-2 border-gray-600 rounded-full px-4 py-1 my-2'/>
                <button onClick={()=>{handleSubmit()}} className='btn w-[50%] md:w-[20%] mt-3'>Submit</button>
            </div>
            </div>
        </div>
            <img className='w-full h-[92vh] bg-cover'src={'assets/bloodbg.jpg'} alt='/'/>
        </div>
    </div>
  )
}

export default DonorRegisterPage
