import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase.config';
import { useParams } from 'react-router-dom';
import Spinner from '../components/UI/Spinner';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {FaBed,FaChair , FaParking,  FaBath, FaShare,FaMapMarkerAlt} from 'react-icons/fa';
import ContactForm from '../components/ContactForm/ContactForm';


// import { useRef, useEffect } from 'react';
// import { register } from 'swiper/element/bundle';
// import 'swiper/css';

// register();



function Listing() {

    const [contactLandlord,setContactLandlord] = useState(false);
    const [loading,setLoading ] = useState(true);
    const [listing, setListing ] = useState([]);
    const [shareLinkCopied,setShareLinkCopied] = useState(false);

    const {listingId} = useParams();
    // console.log(listingId);  

    const docRef = doc(db,'listings', listingId )

    useEffect(()=>{

        async function fetchListing(){
            try {
                const docSnap = await  getDoc(docRef);
                // console.log(docSnap.data());
                if(docSnap.exists()){
                    setListing(docSnap.data())
                    // console.log(listing);
                }
                setLoading(false);
            } catch (error) {
                // console.log(error.message);
                setLoading(false);
            }
        }

        fetchListing();
    },[listingId])


    const settings = {
        dots: true,
        fade:true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
      };

    //   const styles = {
    //     background:`$`
    //   }

    if(loading) return <Spinner />

  return (
    <main>
        <Slider {...settings}>
            {listing?.imgUrls?.map((url,index)=>(
                <div className="w-full overflow-hidden h-[500px] " key={index} style={{background:`url(${listing.imgUrls[index]}) center no-repeat`}}>
                    <img className='w-full object-cover h-full' src={url} alt="slide image" />
                </div>
            ))}
        </Slider>
        <div className="fixed top-[13%] right-[3%] z-[10] bg-white cursor-pointer border-2 border-gay-400 rounded-full w-12 h-12 flex items-center justify-center" onClick={()=>{
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true);
            setTimeout(()=>{setShareLinkCopied(false)},2000)
        }}>
            <FaShare className='text-lg text-slate-500'/>
        </div>
        {shareLinkCopied &&
            <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-[10] p-2  '>Link Copied</p>
        }
        <div className="flex flex-col justify-center  items-center max-w-xl m-4 mt-8 rounded-lg lg:space-x-5 space-y-5 md:space-y-0 bg-white shadow-lg p-4 lg:mx-auto">
            <div className=" w-full ">
                <p className=" text-sm lg:text-2xl font-bold mb-3 text-blue-900">{listing.name} - ${''} {listing.offer? listing?.discountedprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','): listing?.regularprice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}
                {
                    listing?.type === 'rent' ? ' /Month' : ''
                }</p>
                <p className='flex items-center gap-1 mb-3 font-semibold  '><FaMapMarkerAlt className='text-secondary'/> {listing?.address}</p>
                <div className='flex mb-3 items-center justify-start space-x-4 w-[75%]'>
                <p className='bg-red-800 text-center w-full max-w-[200px] rounded-md p-1 text-white font-semibold shadow-md' >{listing?.type == 'rent' ? 'Rent' : 'Sale'}</p>
                {
                    listing?.offer && (
                        <p className='w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold'>${+listing?.regularprice - +listing?.discountedprice} discount</p>
                        )
                }
                </div>
                <p className='mb-3'> <span className='font-semibold '>Description - </span> {listing?.description}</p>
                <ul className='text-sm mb-3 font-semibold flex items-center justify-around'>
                    <li className='flex items-center'>
                        <FaBed className='text-lg whitespace-nowrap mr-1'/>
                        {
                        +listing?.bedrooms > 1 ? `${listing?.bedrooms} Beds` : '1 Bed'
                        }</li>
                    <li className='flex items-center'>
                        <FaBath className='text-lg whitespace-nowrap mr-1'/>
                        {
                        +listing?.bathrooms >1 ? `${listing?.bathrooms} Baths` : '1 Baths'
                        }</li>
                    <li className='flex items-center'>
                        <FaParking className='text-lg whitespace-nowrap mr-1'/>
                        { listing?.parking ? 'Parking' : 'No Parking'
                        }</li>
                    <li className='flex items-center'>
                        <FaChair className='text-lg whitespace-nowrap mr-1'/>
                        { listing?.furnished ? 'Furnished' :'Not Furnished'
                        }</li>
                </ul>
                
                {!contactLandlord && listing?.userRef !== auth.currentUser?.uid && (
                    <div className="mt-6">
                    <button onClick={()=>setContactLandlord(true)} className='py-3 px-7 text-white font-medium text-sm uppercase rounded shadow-md  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out bg-blue-600'>Contact Landlord</button>
                </div>)
            }
            {
                contactLandlord && (
                    <ContactForm userRef={listing?.userRef} listing={listing}/>
                )
            }
            </div>
            {/* <div className="bg-pink-400 w-full h-[200px]"></div> */}
        </div>
     </main>

  )
}

export default Listing