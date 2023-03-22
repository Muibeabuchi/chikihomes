import { useEffect,useState } from "react"
import {auth} from '../firebase.config';
import { onAuthStateChanged } from "firebase/auth";

function useAuth() {

    
    // const [signedIn,setSignedIn] = useState(false);
    // const [checkingStatus,setCheckingStatus] = useState(true);
    const [userData,setUserData] = useState(null);
    const [checkingStatus,setCheckingStatus] = useState(true);

    useEffect(()=>{
        
      const unsuscribe =  onAuthStateChanged(auth,data =>{
            console.log('this is the' + data);
            // setUserData(data.uid)
            if(data?.uid){
                setUserData(data)
                setCheckingStatus(false)
            }else{
                setUserData(null)
            }
            setCheckingStatus(false)
            console.log(checkingStatus);


            console.log(userData);

            // const data = await setUserData(data)
 
            // if(data){
            //     // setSignedIn(prev => !prev);
            //     setUserData(data);
            //     console.log(data,userData);
            // }else{
            //     setUserData(null)
            // }
            // console.log(userData);
            // // setCheckingStatus(false);
        });
        return ()=> unsuscribe();
    },[])


    console.log(userData);
    console.log(checkingStatus);

    return {userData,checkingStatus};
}


export default useAuth;
