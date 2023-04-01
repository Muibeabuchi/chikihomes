import {Routes,Route } from "react-router-dom";
import {Category, Listing , EditListing, CreateListing, HomePage, OffersPage, ProfilePage, SignInPage, SignupPage,ForgotPasswordPage} from "./pages";
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
      <Route path='/create-listing' element={
        <ProtectedRoute>
          <CreateListing />
        </ProtectedRoute>
        } />

      <Route path='/edit-listing/:id' element={
        <ProtectedRoute>
          <EditListing />
        </ProtectedRoute>
        } />

        <Route path='/category/:categoryName/:listingId' element={<Listing/>} />
        
      <Route path='/sign-in' element={<SignInPage/>}/>
      <Route path='/category/:categoryName' element={<Category/>}/>
      <Route path='/sign-up' element={<SignupPage/>}/>
      <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
      <Route path='/offers' element={<OffersPage/>}/>
    </Routes>
  </>
  
}

export default App
