import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../Pages/Others/NotFound/NotFound";
import Profile from "../Pages/ForUser/Profile/Profile";
import Timeline from "../Pages/ForUser/Timeline/Timeline";
import ReportedPosts from "../Pages/ForAdmin/ReportedPosts/ReportedPosts";
import Users from "../Pages/ForAdmin/Users/Users";
import OthersProfile from "../Pages/ForUser/OthersProfile/OthersProfile";
import Banned from "../Pages/Others/Banned/Banned";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        },
        {
          path: 'my-profile',
          element: <PrivateRoute><Profile></Profile></PrivateRoute>,
        },
        {
          path: 'profile/:email',
          element: <PrivateRoute><OthersProfile></OthersProfile></PrivateRoute>,
          loader: async ({ params }) => {
              const [profileRes, postsRes] = await Promise.all([
                  fetch(`http://localhost:5000/profile/${params.email}`).then((res) => res.json()),
                  fetch(`http://localhost:5000/post/${params.email}`).then((res) => res.json())
              ]);
              return { profile: profileRes, posts: postsRes };
          }
      },
        {
          path: 'timeline',
          element: <PrivateRoute><Timeline></Timeline></PrivateRoute>,
           loader: () =>  fetch("http://localhost:5000/post"),
        },
        {
          path: 'reported-posts',
          element: <PrivateRoute><ReportedPosts></ReportedPosts></PrivateRoute>,
           loader: () =>  fetch("http://localhost:5000/post"),
        },
        {
          path: 'users',
          element: <PrivateRoute><Users></Users></PrivateRoute>,
          loader: () =>  fetch("http://localhost:5000/users"),
        },
        {
          path: 'login',
          element: <Login></Login>,
        },
        {
            path: 'register',
            element: <Register></Register>,
        },
        {
            path: 'banned-profile',
            element: <Banned></Banned>,
        },
      ]
    },
    {
      path: "*",
      element: <NotFound></NotFound>
    }
  ]);