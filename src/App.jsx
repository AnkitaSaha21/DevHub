import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const DeveloperList = lazy(() => import("./pages/DeveloperList"));
const DeveloperProfile = lazy(() => import("./pages/DeveloperProfile"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));

import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
    
    <NavBar/>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/developers" element={<DeveloperList />} />
          <Route path="/developer/:id" element={<DeveloperProfile />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route
            path="/create-blog"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-blog/:id"
            element={
              <PrivateRoute>
                <CreateBlog />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    
    </BrowserRouter>
  );
}

export default App;
