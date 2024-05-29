import {BrowserRouter, Routes, Route} from "react-router-dom"
import Front from "./pages/Front";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import PostPage from "./pages/PostPage";
import UpdateProfile from "./pages/UpdateProfile";
import EditProfile from "./pages/EditProfile";


function App() {

  return (
    <>

   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Front/>}/>
   <Route path='/signup' element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
   
   
   <Route path='/home' element={<Home/>}/>
   
   <Route path='/post' element={<PostPage/>}/>
   <Route path='/update' element={<UpdateProfile/>}/>
   <Route path='/edit' element={<EditProfile/>}/>


     
   
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
