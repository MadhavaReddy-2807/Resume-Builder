import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home'
import Dashboard from './dashboard'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './login'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeid]/edit'
import View from './dashboard/resume/[resumeid]/view'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router=createBrowserRouter([
  {
    element:<App/>,
    // this is the router place app contains childern instead of single route
    children:[

      {
         path:'/dashboard',
         element:<Dashboard/>
      }
]
  
  }, {
    path:'/',
    element:<Home/>
  },{
    path:'/login',
    element:<Login/>
  },{
    path:'/dashboard/resume/:resumeid/edit',//dynamic route to edit the resume
    element:<EditResume/>
  },
  {
    path:'/dashboard/resume/:resumeid/view',
    element:<View/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
  </StrictMode>,
)
