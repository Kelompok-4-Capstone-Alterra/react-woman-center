import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/layouts/Sidebar";
import Navbar from "../components/Navbar";
import SubNavbar from "../components/Navbar/SubNavbar";

const Dashboard = ({ page }) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleExpandSidebar = (expand) => {
    setIsExpand(expand);
  };

  return (
    <div className="relative flex">
      <Sidebar
        expand={isExpand}
        handleExpandSidebar={handleExpandSidebar}
        className="z-10"
      />
      <div className="absolute right-0 left-40">
        <Navbar page={page} />
        <SubNavbar />
        <div className="p-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
