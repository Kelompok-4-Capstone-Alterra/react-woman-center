import React from 'react';
import Sidebar from '../components/layouts/Sidebar';
import { Outlet } from 'react-router';

const Dashboard = () => {
  return (
    <div className="relative flex">
      <Sidebar expand={false} className="z-10" />
      <div className="absolute right-0  left-40">
        <div className="flex flex-col justify-center h-24 bg-primaryPressed ps-12 -z-10">
          <h1 className="text-2xl text-white">Dashboard</h1>
          <h2 className="text-white">Subtitle</h2>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
