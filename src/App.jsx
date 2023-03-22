import {Routes,Route } from "react-router-dom";
import {HomePage, OffersPage, ProfilePage, SignInPage, SignupPage,ForgotPasswordPage} from "./pages";
import ProtectedRoute from "./routers/ProtectedRoute";
import Header from './components/Header/Header';

function App() {

  return <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/profile' element={
        <ProtectedRoute>
          <ProfilePage/>
         </ProtectedRoute> 
      } 
      />
        {/* <Route index  element={<ProfilePage />} /> */}
      {/* </Route> */}
      <Route path='/sign-in' element={<SignInPage/>}/>
      <Route path='/sign-up' element={<SignupPage/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
      <Route path='/offers' element={<OffersPage/>}/>
    </Routes>
  </>
  
}

export default App
