import React from "react";
import Sidebar from "../components/layouts/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-primary ps-12 flex flex-col justify-center w-full h-24">
        <h1 className="text-white text-2xl">Dashboard</h1>
        <h2 className="text-white">Subtitle</h2>
      </div>
    </div>
  );
};

export default Dashboard;
