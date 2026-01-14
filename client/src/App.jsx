import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component that doesn't need lazy loading (used frequently)
import PrivateRoute from "./components/PrivateRoute";

// Lazy load all page components
const Front = lazy(() => import("./pages/Front"));
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const CampusAi = lazy(() => import("./pages/CampusAi"));
const Profile = lazy(() => import("./pages/Profile"));
const AddPost = lazy(() => import("./pages/AddPost"));
const PostPage = lazy(() => import("./pages/PostPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const Notification = lazy(() => import("./pages/Notification"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Explore = lazy(() => import("./pages/Explore"));
const UserPage = lazy(() => import("./pages/UserPage"));

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Front />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          
          <Route path='/campusai' element={<CampusAi />} />
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