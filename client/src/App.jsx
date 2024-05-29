import {BrowserRouter, Routes, Route} from "react-router-dom"
import Front from "./pages/Front";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


import PostPage from "./pages/Postssection";
import ProfilePage from "./pages/Editprofile";

import Update from "./pages/Update";


function App() {

  return (
    <>

   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Front/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
   
   
   <Route path='/home' element={<Home/>}/>
   
   <Route path='/edit' element={<ProfilePage/>}/>
   <Route path='/post' element={<PostPage/>}/>
   <Route path='/update' element={<Update/>}/>

     
   
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
