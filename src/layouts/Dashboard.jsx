import React from "react";
import Sidebar from "../components/layouts/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex relative">
      <Sidebar expand={false} className="z-10" />
      <div className=" absolute left-40 right-0 ">
        <div className="bg-primary ps-12 flex flex-col justify-center h-24 -z-10">
          <h1 className="text-white text-2xl">Dashboard</h1>
          <h2 className="text-white">Subtitle</h2>
        </div>
        <div>
          {/* Buat Outlet dari React Router */}
          {/* <Outlet/> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
