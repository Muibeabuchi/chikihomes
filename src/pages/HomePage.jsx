import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import SliderComponent from "../components/Slider/SliderComponent";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/UI/ListingItem";

function HomePage() {

  const [loading,setLoading] = useState(false);
  const [offerListings,setOfferListings] = useState([]);
  const [saleListings,setSaleListings] = useState([]);
  const [rentListings,setRentListings] = useState([]);

  const colRef = collection(db,'listings');
  const offersQuery  = query(colRef,where('offer','==',true),orderBy('timestamp','desc'),limit(4));
  const saleQuery  = query(colRef,where('type','==','sale'),orderBy('timestamp','desc'),limit(4));
  const rentQuery  = query(colRef,where('type','==','rent'),orderBy('timestamp','desc'),limit(4));


  async function getQuery(q,queryState){
    
    try {
      const Snapshot = await getDocs(q);
      let listings =[];
      if(Snapshot){
        Snapshot.forEach(doc => {
          return listings.push({data:doc.data(),id:doc.id})
        });
        if(queryState == 'offer'){
          setOfferListings(listings)
        }else if(queryState == 'sale'){
          setSaleListings(listings)
        }else if(queryState == 'rent'){
          setRentListings(listings)
        }
        // console.log(listings);
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getQuery(offersQuery,'offer');
    getQuery(saleQuery,'sale');
    getQuery(rentQuery,'rent');
  },[])

  function  NoListing (){
    return <div className="max-w-6xl ">

      <p  className="text-center my-6 text-xl font-bold">Sorry, There are no Listings to be shown right now!</p>
    </div>
  } 

  // console.log(rentListings);
  // console.log(saleListings);
  // console.log(offerListings);
  return (
    <div>
      <SliderComponent />

      <div className="max-w-6xl mx-auto  p-4 space-y-6">
        {offerListings && offerListings.length>0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl mt-6 font-semibold">Recent Offers</h2>
            <Link to='/offers' className="my-6">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more Offers</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
              {  
                offerListings?.map((item) => <ListingItem  key={item?.id} {...item} />)
              }
            </ul>
          </div>
        )}
        {
          offerListings && offerListings.length<1 && (
            <div className="m-2 mb-6">
              <h2 className="px-3 text-3xl mt-6 font-semibold">Recent Offers</h2>
              <Link to='/offers' className="my-6">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more Offers</p>
              </Link>
              <NoListing />
            </div>
          )
        }
        {saleListings && saleListings.length>0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl mt-6 font-semibold"> Places for <span className="text-secondary">Sale</span></h2>
            <Link to='/category/sale' className="my-6">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for Sale</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 my-6 lg:grid-cols-3 xl:grid-cols-4">
              {  
                saleListings?.map((item) => <ListingItem  key={item?.id} {...item} id={item?.id}/>)
              }
            </ul>
          </div>
        )}
                {
          saleListings && saleListings.length<1 && (
            <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl mt-6 font-semibold"> Places for <span className="text-secondary">Sale</span></h2>
              <Link to='/category/sale' className="my-6">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more Places for Sale</p>
              </Link>
              <NoListing />
            </div>
          )
        }

        {rentListings && rentListings.length>0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl mt-6 font-semibold">Places for <span className="text-secondary">Rent</span></h2>
            <Link to='/category/rent' className="my-6">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more places for Rent</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 my-6 lg:grid-cols-3 xl:grid-cols-4">
              {  
                rentListings?.map((item) => <ListingItem  key={item.id} {...item} id={item?.id}/>)
              }
            </ul>
          </div>
        )}
        {
        rentListings && rentListings.length<1 && (
            <div className="m-2 mb-6">
            <h2 className="px-3 text-3xl mt-6 font-semibold"> Places for <span className="text-secondary">Sale</span></h2>
              <Link to='/category/rent' className="my-6">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">Show more Places for Rent</p>
              </Link>
              <NoListing />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default HomePage;