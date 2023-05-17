import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function BloodBankHero({location}) {
    const [bloodbanks, setBloodbanks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/bloodbanks/${location}`)
            .then(res => res.json())
            .then(data => setBloodbanks(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <div className='hidden w-full h-[100vh] bg-white  flex flex-col justify-between'>
                {/* Hero Page Start */}
                <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                    <div>
                        <img className='w-full mix-blend-multiply' src={'assets/blood1.webp'} alt="/" />
                    </div>
                    <div className='flex flex-col justify-center md:items-start w-full px-12'>
                        <p className='text-3xl md:text-4xl font-semibold'>Donate <span className='text-red-600 font-bold'>Blood</span> Give The Gift of Life</p>
                        <h1 className='py-3 text-5xl md:text-7xl font-bold text-red-600 hover:scale-105'>Our Blood Services</h1>
                        {/* <div className='flex m-4'>
                            <Link to='/'><button className='btn py-3 px-5 my-4 mx-3' >Register as Donor</button></Link>
                            <Link to='/'><button className='btn py-3 px-5 my-4 bg-red-500'>Find a Donor</button></Link>
                        </div> */}
                    </div>
                </div>

            </div>
            {/* Hero Page Ends */}

            {/*BloodBank Details Start*/}

            <h1 className='flex flex-col  justify-items-center text-3xl md:text-4xl font-semibold my-12 text-gray-800 text-center'>Nearby Blood Banks</h1>

            <div className='w-auto flex flex-col justify-items-center mx-5 mb-[10vh]'>
                {
                    bloodbanks.map((item) => {
                        const { providerName, address, regdId, email, contactNo } = item;
                        return (
                            <div className="min-h-[6vh] w-[85vw] md:w-[60vw] mx-auto bg-white my-3 md:my-4 py-4 px-[5vw] rounded-3xl shadow-xl" key={regdId}>
                                <h1 className="font-bold text-xl text-gray-600 my-2">{providerName}</h1>
                                <h2 className="text-xl my-2 font-semibold">Contact No: {contactNo}</h2>
                                <h1 className='text-xl my-2 font-semibold'>Address: {address}</h1>
                                {/* <h2 className="text-xl my-3 font-semibold">Registration No: {regNo}</h2>
                                    <h2 className="text-xl my-3 font-semibold">Email: {email}</h2> */}
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
