// import React from 'react'

import { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import {toast} from 'react-toastify';
// import {  } from "react";

function ContactForm({userRef,listing}) {

    const [landlord,setLandlord] = useState(null);
    const [message,setMessage] = useState('');

    useEffect(()=>{

        async function getLandlord(){
            const docRef = doc(db,'users',userRef);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                setLandlord(docSnap.data())
            }else{
                toast.error('Could not get Landlord data')
            }
        }

        getLandlord();
    },[userRef])

  return (
    <>
    {
        landlord !== null && (
            <div className="mb-3">
                <p>Contact <span className="font-medium text-md text-secondary">{landlord?.name.toUpperCase()} </span> for the {listing?.name.toLowerCase()}</p>
            </div>
        )
    }
    {/* <p></p> */}
        <div className="w-full">
            <form className='w-full'>
                <textarea onChange= {(e)=>setMessage(e.target.value)} value={message} className='w-full resize-none px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out mt-3 mb-6 focus::text-gray-700 focus:bg-white focus:border-slate-600' required name="message" id="message" />
            </form>
        </div>

    <a href={`mailto:${landlord?.email}?Subject=${listing?.name}&body=${message} `} >
        <button type="button" className="mb-6 px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out text-center ">Send Message</button>
    </a>
    </>
)
}

export default ContactForm;