import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginImage from '../assets/loginimage.jpg';
import GoogleButton from '../components/UI/GoogleButton';
import { auth } from '../firebase.config';


function SignInPage() {

  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(true);
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  });
  const {email,password} = formData;

  function handleInput(e){
    setFormData(prevState=>({
      ...prevState,
      [e.target.name]:e.target.value
    })) 
    // console.log(formData);
  }
  async function handleSignIn (e){
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(auth,email,password);
      const user = userCredentials.user;

      if(user){
        navigate('/profile')
      }
    } catch (error) {
      const errorMessage = error.message
      if(error.message.includes('user-not-found')){
        toast.error('user-not-found')
      }else{
        toast.error('Wrong user credentials')
      }
      // console.log(error.message);
    }
  }
  return (
    <section className=''>
      <h1 className="text-3xl text-center text-secondary mt-6 font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto gap-x-6">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img src={loginImage} alt="login image" className='w-full rounded-2xl object-cover'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%]'>
          <form onSubmit={handleSignIn} id='sign-in' className='space-y-4'>
            <input type="email" required name='email' value={email}  onChange={handleInput} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' placeholder='Email Adress'/>
            <div className="relative">
              <input type={showpassword ? 'password' :'text'} required placeholder='Password' name='password' value={password} onChange={handleInput} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'  />
              {
                showpassword ? <span className='absolute right-3 top-[22%] text-xl cursor-pointer' onClick={()=> setShowpassword(prev=>!prev)}><i className="ri-eye-off-fill"></i></span>: 
                <span className='absolute right-3 top-[22%] text-xl cursor-pointer' onClick={()=> setShowpassword(prev=>!prev)}><i className="ri-eye-fill"></i></span>
              }
            </div>
            <div className=" flex flex-col text-center gap-y-3 xl:flex-row w-full xl:justify-between md:items-center md:whitespace-nowrap">
              <p className='text-[.8rem] md:text-base'>Don't have an account?<span className="text-secondary cursor-pointer ml-1 transition ease-in-out"><Link to='/sign-up'>Register</Link></span></p>
              <Link to='/forgot-password' className='md:text-base text-blue-600 cursor-pointer transition ease-in-out text-[.8rem]'>Forgot Password?</Link>
            </div>
          </form>
          <button type='submit' form='sign-in' className='w-full bg-blue-600 rounded-sm shadow-md hover:bg-blue-700 transition ease-in-out hover:shadow-lg active:bg-blue-800 text-white px-7 py-3 font-medium text-sm uppercase mt-4'>Sign In</button>
          <div className="md:my-4 my-2 items-center flex before:border-t  before:flex-1  before:text-gray-300 after:border-t  after:flex-1  after:text-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <GoogleButton />
        </div>
      </div>
    </section>
  )
}

export default SignInPage