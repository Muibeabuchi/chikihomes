import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../assets/ISTOCK1.jpg';
import GoogleButton from '../components/UI/GoogleButton';
// import {auth} from '../firebase.config'; 
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';
import {auth, db} from '../firebase.config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignupPage() {

  const [showpassword, setShowpassword] = useState(true);
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
  });

  const {name,email,password} = formData;

  function handleInput(e){
    setFormData(prevState=>({
      ...prevState,
      [e.target.name]:e.target.value
    })) 
    console.log(formData);
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();

    
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
      // console.log(userCredentials);
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const user = userCredentials.user
      // console.log(user);
      const formDataCopy = {
        name,
        email,
        timestamp:serverTimestamp()
      }
      // const userRef = doc(db,'user',);
      await setDoc(doc(db,'users',user.uid),formDataCopy);
      if(user){
        setFormData({
          name:'',
          email:'',
          password:''
        })
      }
      console.log(user);
      toast.success('Sign up was successful')
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong with the registration')
    }
  }
  return (
    <section className=''>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto gap-x-6">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img src={loginImage} alt="login image" className='w-full rounded-2xl object-cover '/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%]'>
          <form id='signup' onSubmit={handleSubmit} className='space-y-4 mt-5 lg:mt-0'>
            <input type="text" required name='name' value={name}  onChange={handleInput} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' placeholder='Full Name'/>
            <input type="email" name='email' required value={email}  onChange={handleInput} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' placeholder='Email Adress'/>
            <div className="relative">
              <input type={showpassword ? 'password' :'text'} required placeholder='Password' name='password' value={password} onChange={handleInput} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'  />
              {
                showpassword ? <span className='absolute right-3 top-[22%] text-xl cursor-pointer' onClick={()=> setShowpassword(prev=>!prev)}><i className="ri-eye-off-fill"></i></span>: 
                <span className='absolute right-3 top-[22%] text-xl cursor-pointer' onClick={()=> setShowpassword(prev=>!prev)}><i className="ri-eye-fill"></i></span>
              }
            </div>
            <div className=" flex flex-col text-center gap-y-3 xl:flex-row w-full xl:justify-between md:items-center md:whitespace-nowrap">
              <p className='text-[.8rem] md:text-base'>Already have an account?<span className="text-secondary cursor-pointer ml-1 transition ease-in-out"><Link to='/sign-in'>Sign In</Link></span></p>
              <Link to='/forgot-password' className='md:text-base text-blue-600 cursor-pointer transition ease-in-out text-[.8rem]'>Forgot Password?</Link>
            </div>
          </form>
          <button type='submit' form='signup' className='w-full bg-blue-600 rounded-sm shadow-md hover:bg-blue-700 transition ease-in-out hover:shadow-lg active:bg-blue-800 text-white px-7 py-3 font-medium text-sm uppercase mt-4'>Register</button>
          <div className="md:my-4 my-2 items-center flex before:border-t  before:flex-1  before:text-gray-300 after:border-t  after:flex-1  after:text-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <GoogleButton />
        </div>
      </div>
    </section>
  )
}

export default SignupPage