import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./Components/Root/Main.jsx";
import Home from "./Components/Home/Home.jsx";
import AuthProvider from './Components/AuthProvider/AuthProvider';
import Login from './Components/Authenticationfiles/Login';
import Register from './Components/Authenticationfiles/Register';
import PrivateRoute2 from './Components/PrivateRoute/PrivateRoute2';
import EPage from "./Components/Errorpages/EPage.jsx";
import Page404 from "./Components/Errorpages/Page404.jsx";
import AssignmentDetails from "./Components/AllRoutes/AssignmentDetails.jsx";
import AddAssignment from "./Components/AddAssignment/AddAssignment.jsx";
import UpdateAssignment from "./Components/UpdateAssignment/UpdateAssignment.jsx";
import UserAddedAssignment from "./Components/UserAssignment/UserAddedAssignment.jsx";
import PrivateRoute3 from "./Components/PrivateRoute/PrivateRoute3.jsx";
import HowItWorks from "./Components/AllRoutes/HowItWorks.jsx";
import About from "./Components/AllRoutes/About.jsx";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        errorElement: <EPage/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <PrivateRoute2><Login/></PrivateRoute2>
            },
            {
                path: '/register',
                element: <PrivateRoute2><Register/></PrivateRoute2>
            },
            {
                path: '/howitworks',
                element: <HowItWorks/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/addassignment',
                element: <PrivateRoute3><AddAssignment/></PrivateRoute3>
            },
            {
                path: '/assignmentdetails/:homeassignments/:id',
                element: <PrivateRoute><AssignmentDetails/></PrivateRoute>,
                loader: async ({params}) => await fetch(`https://online-group-study-serverside.vercel.app/${params.homeassignments}/${params.id}`)
            },
            {
                path: '/updateassignment/:assignments/:id',
                element: <UpdateAssignment/>,
                loader: async  ({params}) => await fetch(`https://online-group-study-serverside.vercel.app/${params.assignments}/${params.id}`)
            },
            {
                path: '/myassignments',
                element: <PrivateRoute><UserAddedAssignment/></PrivateRoute>,
            },
            {
                path: '/*',
                element: <Page404/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}/>
          </QueryClientProvider>
      </AuthProvider>
  </React.StrictMode>,
)
