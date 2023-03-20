import { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../assets/ISTOCK3.jpg';
import GoogleButton from '../components/UI/GoogleButton';


function SignupPage() {
  const [email,setEmail] = useState('');
  
  function handleInput(e){
    setEmail(e.target.value) 
    console.log(email);
  }
  return (
    <section className=''>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto gap-x-6">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img src={loginImage} alt="login image" className='w-full rounded-2xl object-cover'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%]'>
          <form  className='space-y-4'>
            <input type="email" name='email' required value={email}  onChange={handleInput} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' placeholder='Email Adress'/>
            <div className=" flex flex-col text-center gap-y-3 md:flex-row w-full md:justify-between md:items-center md:whitespace-nowrap">
              <p className='text-[.8rem] md:text-base'>Don't have an account?<span className="text-secondary cursor-pointer ml-1 transition ease-in-out"><Link to='/sign-up'>Register</Link></span></p>
              <Link to='/sign-in' className='md:text-base text-blue-600 cursor-pointer transition ease-in-out text-[.8rem]'>Sign in instead?</Link>
            </div>
          </form>
          <button type='button' className='w-full bg-blue-600 rounded-sm shadow-md hover:bg-blue-700 transition ease-in-out hover:shadow-lg active:bg-blue-800 text-white px-7 py-3 font-medium text-sm uppercase mt-4'>Send Reset Email</button>
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