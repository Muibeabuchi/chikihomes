import {Routes,Route } from "react-router-dom";
import {HomePage, OffersPage, ProfilePage, SignInPage, SignupPage,ForgotPasswordPage} from "./pages";
import Header from './components/Header/Header';

function App() {

  return <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/sign-in' element={<SignInPage/>}/>
      <Route path='/sign-up' element={<SignupPage/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
      <Route path='/offers' element={<OffersPage/>}/>
    </Routes>
  </>
  
}

export default App
