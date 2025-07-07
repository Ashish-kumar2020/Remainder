import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import SideBar from "./sidebar/SideBar";
import DashboardLayout from "./Content/DashBoardLayout";

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      {/* Top Navbar */}
      <DashboardLayout />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Page Content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
