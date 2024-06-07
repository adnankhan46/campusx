import {BrowserRouter, Routes, Route} from "react-router-dom"
import Front from "./pages/Front";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Profile from "./pages/Profile";
 import PrivateRoute from "./components/PrivateRoute";
import AddPost from "./pages/AddPost";
import PostPage from "./pages/PostPage";
import ReportPage from "./pages/ReportPage";
// import Comment from "./components/Comment";



function App() {
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
   
   <Route path='/ReportPage' element={<ReportPage/>}/>
    
   
   
   <Route path='/upload' element={<AddPost/>}/>
   <Route path='/post/:postId' element={<PostPage/>}/>
   
   
   
   
   <Route path='*' element={<h1>Bhai Saahab ye kis line me aa gaye aap</h1>}/>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
