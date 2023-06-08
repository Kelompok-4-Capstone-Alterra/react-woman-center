import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/layouts/Sidebar";

const Dashboard = ({ page }) => {
  const [isExpand, setIsExpand] = useState(false);

  const handleExpandSidebar = (isExpand) => {
    setIsExpand(isExpand);
  };

  return (
    <div className="relative flex">
      <Sidebar
        expand={isExpand}
        handleExpandSidebar={handleExpandSidebar}
        className="z-10"
      />
      <div className="absolute right-0 left-40">
        <div className="flex flex-col justify-center h-24 bg-primaryPressed ps-12 -z-10 gap-1">
          <h1 className="text-2xl text-white">Dashboard</h1>
          <h2 className="text-white">{page}</h2>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
