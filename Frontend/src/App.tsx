import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'
import HomeContent from './components/Content/HomeContent'
import YoutubeContent from './components/Content/YoutubeContent'
import TweetContent from './components/Content/TweetContent'
import About from './components/Pages/About'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
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
        },
        {
          path: "youtubecontent",
          element: <YoutubeContent/>
        },
        {
          path:"tweet",
          element: <TweetContent/>
        },{
          path: "about",
          element: <About/>
        }
      ]
    }
  ])

  return (
   
     
<RouterProvider router={router} />
  )
}

export default App
