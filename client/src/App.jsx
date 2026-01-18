import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/feed/Home"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Login = lazy(() => import("./pages/auth/Login"));
const CampusChat = lazy(() => import("./pages/campusx-chat/CampusChat"));
const Profile = lazy(() => import("./pages/user/Profile"));
const AddPost = lazy(() => import("./pages/post/AddPost"));
const PostPage = lazy(() => import("./pages/post/PostPage"));
const ReportPage = lazy(() => import("./pages/error-page/ReportPage"));
const Notification = lazy(() => import("./pages/notification/Notification"));
const ErrorPage = lazy(() => import("./pages/error-page/ErrorPage"));
const Explore = lazy(() => import("./pages/opportunity/Explore"));
const UserPage = lazy(() => import("./pages/user/UserPage"));

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem'
  }}>
    BeCampusx Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/campusai' element={<CampusChat />} />
          <Route path='/home' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/report' element={<ReportPage />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/upload' element={<AddPost />} />
            <Route path='/post/:postId' element={<PostPage />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/user' element={<UserPage />} />
          </Route>

          {/* other routees */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;