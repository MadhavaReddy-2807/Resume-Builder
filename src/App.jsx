import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ImageOff } from 'lucide-react'
import { ClerkProvider } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/ui/custom/header'
// import App from './spline/spline'
import Spline from '@splinetool/react-spline';

// import Splineapp from './spline/spline'
function App() {
  // const navigate=useNavigate();
  const [count, setCount] = useState(0)
  const {user,isLoaded,isSignedIn}=useUser();
  if(!isLoaded)
  {
    return <p>Loading...</p>
  }
  //  import isSignedin from useUser to check when the sesion is active or not
  if(!isSignedIn)
  {
    return <Navigate to={'/login'}/>
    //during conditional rendering use this instead of navigate
    //it navigates to login page
  }

  return (
      <>
         <Header/>
         <Outlet/>
         {/* <Spline scene="https://prod.spline.design/EWmgyqr2k2Th1ZdI/scene.splinecode" /> */}
         {/* it dispalys all the childersn it has home dashboard and etc  */}
      </>
  )
}

export default App
