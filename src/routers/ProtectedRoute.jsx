import { Navigate } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({children}) {
    const {userData,checkingStatus} = useAuth();
    // const loggedIn = true;

    if(checkingStatus){
        return <Spinner />
    }
  return userData ? children : <Navigate to='/sign-in' /> 
}

export default ProtectedRoute;