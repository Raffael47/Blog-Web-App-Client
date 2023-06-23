import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { SignupPage } from "./pages/signup-page";
import { Verify } from "./pages/verify";
import { LoginPage } from "./pages/login-page";
import { ForgotPassword } from "./pages/forgot-password"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "./redux/userSlice";
import { useEffect } from "react";
import { ResetPassword } from "./pages/reset-password";
import { CreateBlog } from "./pages/create-blog";
import { UserSettings } from "./pages/user-settings";
import { BlogDetail } from "./pages/blog-detail";
import { SearchPage } from "./pages/search";


function App() {

  const dispatch = useDispatch()

  const router = createBrowserRouter([
    { path:"/", element: <Home/> },
    { path:"/sign-up", element: <SignupPage/> },
    { path:"/verification/:token", element: <Verify/> },
    { path:"/verification-change-email/:token", element: <Verify/> },
    { path:"/log-in", element: <LoginPage/> },
    { path:"/forgot-password", element: <ForgotPassword/> },
    { path:"/reset-password/:token", element: <ResetPassword/> },
    { path:"/create-blog", element: <CreateBlog/> },
    { path:"/user-settings", element: <UserSettings/> },
    { path: "/blog-detail/:id", element: <BlogDetail/> },
    { path: "/advanced-search", element: <SearchPage/> }
  ])

  const token = localStorage.getItem('token')

  const keepLogin = async() => {
    try {
      const {data} = await axios.get("https://minpro-blog.purwadhikabootcamp.com/api/auth/", {
        headers: {
          "Authorization":`Bearer ${token}`
      }
      })
      const {username, email, phone, imgProfile} = data
      dispatch(setAuth({username, email, phone, imgProfile}))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    token? keepLogin() : console.log("Log in first")
  })

  return (
      <RouterProvider router={router} />
  );
}

export default App;
