import { signOut, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase.config';
import useAuth from '../hooks/useAuth';
import {FcHome} from 'react-icons/fc';
import ListingItem from '../components/UI/ListingItem';

function ProfilePage() {

  const {userData} = useAuth();
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const navigate = useNavigate();
  const [changeDetail,setChangeDetail] = useState(false);
  const [listings,setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    setEmail(userData?.email)
    setName(userData?.displayName)
  },[userData])

  async function handleSubmit (e){
    e.preventDefault();
    e.stopPropagation();
    // console.log(auth?.currentUser.uid);
    // console.log(userData?.uid);
    const docRef = doc(db,'users',auth?.currentUser.uid);

    try {
      if(userData?.displayName !== name){
        //! update username in auth
        await updateProfile(auth.currentUser,{
          displayName:name,
        })
        // console.log('auth profile updated');
        // !update username in database
        await updateDoc(docRef,{
          name:name,
        })
        // console.log('firestore name updated');
      }
      toast.success('profile details updated')
    } catch (error) {
      toast.error('could not update the profile details')
      // console.log(error);
    }
    
  }

  async function handleSignOut(){

    try {
      await signOut(auth)
      toast.success('sign out successful')
      navigate('/')
    } catch (error) {
      toast.error('There was a problem signing out')
    }

  }
  // const name = user?.displayName;


  // console.log(currentUser);
  // const [formData,setFormData] = useState({
  //   name:auth?.currentUser?.displayName,
  //   email:auth?.currentUser?.email
  // });

  // const {email,name} = formData;

  useEffect(()=>{

    async function fetchUserListing (){

      try {
        const listingRef = collection(db,'listings');
        const q = query(listingRef,where('userRef' ,'==',auth.currentUser.uid ),orderBy('timestamp','desc'));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data(),
          })
        })
        setListings(listings);
        setLoading(false);
          
      } catch (error) {
        // console.log(error.message);        
        setLoading(false);
      }
    }

    fetchUserListing();
  },[auth?.currentUser.uid])

  async function onDelete(id){
    // console.log('deleted');
    if(window.confirm('are you sure you want to delete?')){

      try {
        await deleteDoc(doc(db,'listings',id))
        const updatedListings = listings.filter((item)=>{
          return item.id !== id
        })
        setListings(updatedListings)
        toast.success('Listing deleted');
      } catch (error) {
        // console.log(error.message);
      }

    }
  }

  function onEdit(id){
    // console.log('edited')
    navigate(`/edit-listing/${id}`);    

  }
  return (
    <>
      <section className='max-w-6xl mx-auto flex flex-col items-center justify-between'>
        <h1 className='text-3xl text-center mt-6 font-bold '>My Profile</h1>

        <div className="w-full md:w-1/2 mt-6 px-3">
          <form >
            {/* Name Input */}
            <input type="text" id='name' value={name} disabled={!changeDetail} onChange={(e)=>setName(e.target.value)} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-sm transition ease-in-out ${changeDetail && 'bg-secondary focus:bg-secondary'}`} />
            <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-sm transition ease-in-out ' />
          </form>

          <div className="text-sm sm:text-md mb-6 flex justify-between">
            <p  className='flex items-center'>Do you want to change your name?<span onClick={changeDetail ? handleSubmit : ()=>setChangeDetail(prev => !prev)} className='text-secondary transition hover:text-yellow-400 ml-1 ease-in-out duration-200 cursor-pointer '>{
              changeDetail? 'Apply Change' : 'Edit'
            }</span></p>
            <p onClick={handleSignOut} className='text-blue-600 hover:text-blue-800 cursor-pointer transition ease-in-out duration-200'>Sign out</p>
          </div>

        </div>
          <button type="button" className=' bg-secondary opacity-80  text-white uppercase text-sm font-medium px-7 py-3 rounded shadow-md hover:shadow-lg hover:opacity-100 transition duration-200 ease-in-out'><Link to='/create-listing' className='flex items-center gap-2'> <FcHome className='text-xl lg:text-3xl '/> Sell or Rent your home </Link></button>
      </section>    

      <div className="max-w-6xl mt-6 px-3 mx-auto mb-6">

        {    
          !loading && listings?.length > 0 && (
            <>
              <h2 className='mb-6 text-2xl text-center font-semibold  '>My Listings</h2>
              <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 sm:gap-3'>
                {
                  listings.map((item)=>{
                    return <ListingItem key={item.id} {...item} onDelete={onDelete} onEdit={onEdit} />
                  })
                };
              </ul>
            </>
          )
        }
        {
          !loading && listings.length <= 0 &&  <p className='text-center text-gray-500 text-2xl'>No Listing Found.</p> 
        }
      </div>
    </>
  )
}

export default ProfilePage