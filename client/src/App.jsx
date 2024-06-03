import {BrowserRouter, Routes, Route} from "react-router-dom"
import Front from "./pages/Front";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import UpdateProfile from "./pages/UpdateProfile";
import Profile from "./pages/Profile";

import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import AddPost from "./pages/AddPost";


function App() {
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <>

   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Front/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
   
   <Route path='/home' element={<Home/>}/>
   <Route element={<PrivateRoute/>}>
   <Route path='/profile' element={<Profile/>}/>
   </Route>
   
   <Route path='/upload' element={<AddPost/>}/>
   <Route path='/updateprofile' element={<UpdateProfile/>}/>
   
   
   
   
   <Route path='*' element={<h1>Bhai Saahab ye kis line me aa gaye aap</h1>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
