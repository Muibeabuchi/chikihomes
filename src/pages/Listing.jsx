import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';
import { useParams } from 'react-router-dom';
import Spinner from '../components/UI/Spinner';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {FaShare} from 'react-icons/fa';


// import { useRef, useEffect } from 'react';
// import { register } from 'swiper/element/bundle';
// import 'swiper/css';

// register();



function Listing() {


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
                    console.log(listing);
                }
                setLoading(false);
            } catch (error) {
                console.log(error.message);
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
     </main>

  )
}

export default Listing