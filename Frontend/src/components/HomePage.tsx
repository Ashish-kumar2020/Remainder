import { Outlet } from "react-router-dom"
import Navbar from "./navbar/Navbar"
import SideBar from "./sidebar/SideBar"


const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navbar/>
      <Outlet/>
      <SideBar/>
    </div>
  )
}

export default HomePage