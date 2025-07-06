import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import HomeContent from './components/HomeContent/HomeContent'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/signin",
      element: <Signin/>
    },
    {
      path: "/homepage",
      element: <HomePage/>,
      children: [
        {
          index: true,
          element: <HomeContent/>
        }
      ]
    }
  ])

  return (
   
     
<RouterProvider router={router} />
  )
}

export default App
