import googleLogo from '../../assets/googlelogo.png';
import { signInWithPopup } from 'firebase/auth';
import {auth,db,provider} from '../../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

function GoogleButton() {

  const navigate = useNavigate();
  async function onGoogleClick(){
    // console.log('clicked');
    try {
      const res = await signInWithPopup(auth,provider);
      const user = res.user;

      // check if the use exist in the database
      const docRef = doc(db,'users',user.uid)
      const docSnap = getDoc(docRef);
      if(!docSnap.exist()){
        await setDoc(docRef,{
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp()
        })
      }
      navigate('/');
      toast.success('Sign up Successful')
        } catch (error) {
      toast.error('could not authorize with google');
      // console.log(error.message);
    }
  }

  return (
    <button type='button' onClick={onGoogleClick} className='w-full bg-red-600 rounded-sm shadow-md hover:bg-red-700 transition ease-in-out hover:shadow-lg active:bg-red-800 text-white px-7 py-3 font-medium text-sm uppercase mt-4 flex items-center justify-center'>
    <img src={googleLogo} alt="google icon" className='rounded-full w-[25px] h-[25px] object-cover mr-2' />
    Continue with Google</button>
  )
}

export default GoogleButton