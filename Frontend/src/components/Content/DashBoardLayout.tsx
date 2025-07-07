import { useState } from "react";

import AddNewContent from "./AddNewContent";
import Navbar from "../navbar/Navbar";

const DashboardLayout = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Navbar onAddContentClick={() => setShowDrawer(true)} />
      <AddNewContent isOpen={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
  );
};

export default DashboardLayout;
