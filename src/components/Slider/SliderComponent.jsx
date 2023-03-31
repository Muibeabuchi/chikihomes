import { useEffect } from "react";
import {db} from '../../firebase.config';
import { collection,getDocs,limit,orderBy,query } from "firebase/firestore";
import { useState } from "react";
import Spinner from '../UI/Spinner';
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function SliderComponent() {


    const navigate = useNavigate();
    const [listings,setListings] = useState(null);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
  
      async function getListings(){


        try {
          const listingsRef = collection(db,'listings');
          const q = query(listingsRef,orderBy('timestamp','desc'),limit(5))
          const querySnap = await getDocs(q)
          let listings = [];
          querySnap.forEach((doc)=> {
            return listings.push({
              id: doc.id,
              data: doc.data()
            });
          })
          setListings(listings);
          console.log(listings);
          setLoading(false);
         
        } catch (error) {
          console.log(error.message);   
          setLoading(false)
        }
        // console.log(listings);
      }
  
      getListings();
    },[])
  
    if(loading){
      return <Spinner />
    }
  
    // if(listings?.length === 0){
    //   return <></>;
    // }

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


  
  return (
    <>
          <Slider {...settings}>
        {
            listings?.map(({id,data})=>(
              <div  key={id} onClick={()=> navigate(`/category/${data?.type}/${id}`)} className="relative">
                <img src={data?.imgUrls[0]} alt="" className="w-full object-cover h-[300px]" />
                <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-secondary shadow-lg opacity-[90%] p-2 rounded-br-3xl" >{data?.name}</p>
                <p className="text-[#f1faee] absolute right-3 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-[90%] p-2 rounded-tr-3xl" >$
                  {data?.discountedprice ?? data?.regularprice}
                  {!data?.discountedprice ?? data?.discountedprice}
                  {data?.type == 'rent' && ' /Month'}
                </p>

              </div>
            ))
        }
            </Slider>

    </>
  )
}

export default SliderComponent;