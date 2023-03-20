import googleLogo from '../../assets/googlelogo.png';


function GoogleButton() {
  return (
    <button type='button' className='w-full bg-red-600 rounded-sm shadow-md hover:bg-red-700 transition ease-in-out hover:shadow-lg active:bg-red-800 text-white px-7 py-3 font-medium text-sm uppercase mt-4 flex items-center justify-center'>
    <img src={googleLogo} alt="google icon" className='rounded-full w-[25px] h-[25px] object-cover mr-2' />
    Continue with Google</button>
  )
}

export default GoogleButton