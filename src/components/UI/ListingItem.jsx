import React from "react";
// import Moment from ' react-moment';
import { Link } from "react-router-dom";
import { MdLocationPin, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

function ListingItem({ id, data, onDelete, onEdit }) {
  const { userData } = useAuth();

  // const time = Date.parse('23 mar 2023 10:41:19')
  // console.log(time);
  // console.log(data);
  const {
    address,
    imgUrls,
    regularprice,
    discountedprice,
    bathrooms,
    bedrooms,
    name,
    type,
    offer,
    userRef,
  } = data;
  // console.log(timestamp.seconds*1000);
  // const mydate = new Date();
  // console.log(mydate);
  // const mycurrentdate = Date.now()
  // console.log(mycurrentdate);

  return (
    <li className="relative">
      <Link
        to={`/category/${type}/${id}`}
        className=" bg-white flex flex-col  mb-3 justify-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow ease-in-out duration lg:mr-2 "
      >
        <img
          src={imgUrls[0]}
          alt="property card image"
          className="h-[170px] object-cover hover:scale-105 transition duration-200 ease-in "
          loading="lazy"
        />
        {/* <Moment >{}</Moment> */}
        <div className="w-full p-[10px] ">
          <div className="flex items-center space-x-1">
            <MdLocationPin className="h- w-4 text-secondary" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {address}
            </p>
          </div>
          <p className="font-semibold text-xl m-0 truncate">{name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            GH₵
            {offer
              ? discountedprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : regularprice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {type === "rent" && " /month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3 ">
            {/* <div className=""> */}
            <p className="font-bold text-sm">
              {bedrooms > 1 ? `${bedrooms} Beds` : "1 Bed"}
            </p>
            <p className="font-bold text-sm">
              {bathrooms > 1 ? `${bathrooms} Baths` : "1 Bath"}
            </p>
            {/* </div> */}
          </div>
        </div>
      </Link>
      {userRef == userData?.uid && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(id)}
        />
      )}
      {userRef == userData?.uid && (
        <MdEdit
          className="absolute bottom-2 right-8  h-4 cursor-pointer "
          onClick={() => onEdit(id)}
        />
      )}
    </li>
  );
}

export default ListingItem;
