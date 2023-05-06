import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/UI/Spinner";
import { auth, db, storage } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const navigate = useNavigate();
  // const [geolocationEnabled,setGeoLocationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularprice: 0,
    discountedprice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });

  function onChange(e) {
    let boolean = null;

    if (e.target.value == "true") {
      boolean = true;
    }
    if (e.target.value == "false") {
      boolean = false;
    }

    // files
    if (e.target.files) {
      setFormData((prevData) => ({ ...prevData, images: e.target.files }));
    }

    if (!e.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (+formData.discountedprice >= +formData.regularprice) {
      setIsLoading(false);
      toast.error("discounted price needs to be less than regular price");
      return;
    }
    if (formData.images.length > 6) {
      setIsLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
    let geolocation = {};
    geolocation.lat = formData.latitude;
    geolocation.lng = formData.longitude;

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case "paused":
                // console.log('Upload is paused');
                break;
              case "running":
                // console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
              // console.log(downloadURL);
            });
            // console.log('upload complete');
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...formData.images].map((image) => storeImage(image))
    ).catch((err) => {
      setIsLoading(false);
      // console.log(err.message);
      toast.error("Images not uploaded");
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      userRef: auth?.currentUser.uid,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    !formDataCopy.offer && delete formDataCopy.discountedprice;
    const colRef = collection(db, "listings");
    const docRef = await addDoc(colRef, formDataCopy);
    // console.log(docRef);
    setIsLoading(false);
    toast.success("Listing Edited");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md mx-auto p-2">
      <h1 className="text-3xl text-center mt-6 font-bold ">Create a Listing</h1>

      <form id="create-list" onSubmit={onSubmit}>
        <p className="text-lg font-semibold mt-6 text-left">Sell/Rent</p>
        <div className="flex items-center space-x-4">
          <button
            onClick={onChange}
            type="button"
            id="type"
            value="sale"
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.type !== "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            onClick={onChange}
            value="rent"
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.type !== "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Property Name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
        />
        <div className="flex items-center gap-2 mt-6 mb-6">
          <div className="">
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className={`px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center`}
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={formData.bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className={`px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center`}
            />
          </div>
        </div>

        <p className="text-lg font-semibold mt-6 text-left">Parking Spot</p>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !formData.parking
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.parking
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg font-semibold mt-6 text-left">Furnished</p>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !formData.furnished
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.furnished
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
        />
        <p className="text-lg mt-4 font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
        />

        <div className="flex items-center space-x-6">
          <div className="">
            <p>Latitude</p>
            <input
              type="number"
              id="latitude"
              min="-90"
              max="90"
              value={formData.latitude}
              onChange={onChange}
              required
              className="w-full px-4 py2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center "
            />
          </div>
          <div className="">
            <p>Longitude</p>
            <input
              type="number"
              id="longitude"
              min="-180"
              max="180"
              value={formData.longitude}
              onChange={onChange}
              required
              className="w-full px-4 py2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
            />
          </div>
        </div>

        <p className="text-lg font-semibold mt-4 text-left">Offer</p>
        <div className="flex items-center space-x-4 mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !formData.offer
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`px-7 py-3 font-medium text-sm uppercase  shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>

        <div className="mb-5">
          <p className="text-lg font-bold">Regular price</p>
          <div className="flex items-center gap-x-5 w-full">
            <input
              type="number"
              id="regularprice"
              value={formData.regularprice}
              onChange={onChange}
              min="50"
              max="500000000"
              required
              className=" px-4 py-2 text-xl bg-white text-gray-700 border w-[60%] border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
            {formData.type == "rent" && (
              <div className="">
                <p className="text-md w-full ">GH₵ / Month</p>
              </div>
            )}
          </div>

          {formData.offer && (
            <>
              <p className="text-lg font-bold mt-4">Discounted price</p>
              <div className="flex items-center gap-x-5 w-full">
                <input
                  type="number"
                  id="discountedprice"
                  value={formData.discountedprice}
                  onChange={onChange}
                  min="50"
                  max="500000000"
                  required={offer}
                  className=" px-4 py-2 text-xl bg-white text-gray-700 border w-[60%] border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                {formData.type == "rent" && (
                  <div className="">
                    <p className="text-md w-full ">GH₵ / Month</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mb-4">
          <p className="text-xl mb-1 font-bold mt-4">Images</p>
          <p className="text-sm text-gray-700">
            The first image will be the cover (max 6).
          </p>

          <div className="flex items-center w-full rounded bg-white px-4 py-2">
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg ,.jpeg ,.png"
              multiple
              required
              className="text-gray-700 border border-gray-300 transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
              placeholder="choose files"
            />
          </div>
        </div>

        <button
          type="submit"
          form="create-list"
          className="w-full bg-blue-600 rounded uppercase font-medium text-sm shadow-sm hover:shadow-lg text-white py-2 px-5 mb-6 focus:bg-blue-700 focus:shadow-lg active:shadow-lg active:bg-blue-800 transition duration-150 ease-in-out cursor-pointer first-letter hover:bg-blue-700"
        >
          {" "}
          Create Listing
        </button>
      </form>
    </main>
  );
}

export default CreateListing;
