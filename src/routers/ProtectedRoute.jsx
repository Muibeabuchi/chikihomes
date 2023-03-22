import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({children}) {
    const {userData,checkingStatus} = useAuth();
    // const loggedIn = true;

    if(checkingStatus){
        return <h3>Loading .....</h3>
    }
  return userData ? children : <Navigate to='/sign-in' /> 
}

export default ProtectedRoute;