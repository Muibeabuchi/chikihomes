// import React from 'react'

import { useEffect, useState } from "react";
import Spinner from "../components/UI/Spinner";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import ListingItem from "../components/UI/ListingItem";

function OffersPage() {
  const colRef = collection(db, "listings");
  const offersQuery = query(
    colRef,
    where("offer", "==", true),
    orderBy("timestamp", "desc"),
    limit(16)
  );
  const [offerListings, setOfferListings] = useState([]);
  const [lastFetchedListing, setLastFetchedListing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getOffers() {
    try {
      const Snapshot = await getDocs(offersQuery);
      const lastVisible = Snapshot.docs[Snapshot.docs.length - 1];
      setLastFetchedListing(lastVisible);
      // console.log(lastVisible);
      let listings = [];
      if (Snapshot) {
        Snapshot.forEach((doc) => {
          return listings.push({ data: doc.data(), id: doc.id });
        });
        setOfferListings(listings);
        setIsLoading(false);
        // console.log(listings);
      }
    } catch (error) {
      // console.log(error.message);
      toast.error("Could not fetch Listings");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOffers();
    // console.log(offerListings);
  }, []);

  async function onFetchMoreListings() {
    const moreListingsQuery = query(
      colRef,
      where("offer", "==", true),
      orderBy("timestamp", "desc"),
      startAfter(lastFetchedListing),
      limit(4)
    );

    try {
      const Snapshot = await getDocs(moreListingsQuery);
      const lastVisible = Snapshot.docs[Snapshot.docs.length - 1];
      setLastFetchedListing(lastVisible);
      let listings = [];
      if (Snapshot) {
        Snapshot.forEach((doc) => {
          return listings.push({ data: doc.data(), id: doc.id });
        });
        setOfferListings((prevState) => [...prevState, ...listings]);
        setIsLoading(false);
        // console.log(listings);
      }
    } catch (error) {
      // console.log(error.message);
      toast.error("Could not fetch Listings");
      setIsLoading(false);
    }
  }

  // console.log(offerListings);

  // if(isLoading){
  //   return
  // }
  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center font-bold mt-6 mb-6">Offers</h1>
      {isLoading ? (
        <Spinner />
      ) : offerListings && offerListings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:gap-x-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {offerListings?.map((item) => (
                <ListingItem key={item.id} {...item} />
              ))}
            </ul>
          </main>
          {/* {
            lastFetchedListing && (
              <div className="flex items-center justify-center ">
                <button onClick={onFetchMoreListings} className="px-3 py-1 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 transition ease-in-out duration-150">Load More</button>
              </div>
            )
          } */}
        </>
      ) : (
        <p className="text-xl font-semibold capitalize">
          There are no Listings to display
        </p>
      )}
    </div>
  );
}

export default OffersPage;
