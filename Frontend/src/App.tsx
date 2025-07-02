import './App.css'
import HomePage from './components/HomePage'
import Signin from './components/signin/Signin'
import Signup from './components/signup/Signup'

function App() {
  

  return (
    <div className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
     
    {/* <Signup/> */}
    {/* <Signin/> */}
    <HomePage/>
     

    </div>
  )
}

export default App
