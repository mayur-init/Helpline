import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function BloodBankHero() {
    const [bloodbanks, setBloodbanks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/bloodbanks')
          .then(res => res.json())
          .then(data => setBloodbanks(data))
          .catch(error => console.log(error));
      }, []);

    return (
        <div>
            <div className='w-full h-[100vh] bg-white  flex flex-col justify-between'>
                {/* Hero Page Start */}
                <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                    <div>
                        <img className='w-full mix-blend-multiply' src={'assets/blood1.webp'} alt="/" />
                    </div>
                    <div className='flex flex-col justify-center md:items-start w-full px-12'>
                        <p className='text-3xl md:text-4xl font-semibold'>Donate <span className='text-red-600 font-bold'>Blood</span> Give The Gift of Life</p>
                        <h1 className='py-3 text-5xl md:text-7xl font-bold text-red-600 hover:scale-105'>Our Blood Services</h1>
                        <div className='flex m-4'>
                            <Link to='/'><button className='btn py-3 px-5 my-4 mx-3' >Register as Donor</button></Link>
                            <Link to='/'><button className='btn py-3 px-5 my-4 bg-red-500'>Find a Donor</button></Link>
                        </div>
                    </div>
                </div>
               
            </div>
                 {/* Hero Page Ends */}

                {/*BloodBank Details Start*/}

                <h1 className='text-4xl font-bold my-10 text-violet-600 text-center hover:scale-110'>Our Blood Bank Details</h1>
        
                <div className='grid md:grid-cols-3 gap-3 mx-5'>
                {
                    bloodbanks.map((item) => {
                        const { id, name, address, regNo ,email, contactNumber } = item;
                        return (
                            <div className="border min-h-[70vh] bg-white m-4 p-5 rounded-xl shadow-xl hover:scale-105" key={id}>
                                    <h1 className="mx-2 font-bold text-3xl text-center text-violet-600 my-3">{name}</h1>
                                    <h1 className='text-xl mt-7 font-semibold'>Address: {address}</h1>
                                    <h2 className="text-xl my-3 font-semibold">Registration No: {regNo}</h2>
                                    <h2 className="text-xl my-3 font-semibold">Email: {email}</h2>
                                    <h2 className="text-xl my-3 font-semibold">Contact No: {contactNumber}</h2>
                            </div>
                           
                        )
                    })
                }
                 </div>
                {/*BloodBank Details Ends*/}
        </div>
    )
}

export default BloodBankHero
