import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../firebase.config';
import useAuth from '../hooks/useAuth';

function ProfilePage() {

  const {userData} = useAuth();
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setEmail(userData?.email)
    setName(userData?.displayName)
  },[userData])

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
  return (
    <>
      <section className='max-w-6xl mx-auto flex flex-col items-center justify-between'>
        <h1 className='text-3xl text-center mt-6 font-bold '>My Profile</h1>

        <div className="w-full md:w-1/2 mt-6 px-3">
          <form >
            {/* Name Input */}
            <input type="text" id='name' value={name} disabled className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-sm transition ease-in-out ' />
            <input type="text" id='email' value={email} disabled className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded-sm transition ease-in-out ' />
          </form>

          <div className="text-sm sm:text-lg mb-6 flex justify-between">
            <p className='flex items-center'>Do you want to change your name?<span className='text-secondary transition hover:text-yellow-400 ml-1 ease-in-out duration-200 cursor-pointer '>Edit</span></p>
            <p onClick={handleSignOut} className='text-blue-600 hover:text-blue-800 cursor-pointer transition ease-in-out duration-200'>Sign out</p>
          </div>
        </div>
      </section>    
    </>
  )
}

export default ProfilePage