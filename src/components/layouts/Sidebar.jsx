import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = ({ expand }) => {
  return (
    <div
      className={`h-screen  shadow-right flex flex-col justify-start py-8  w-40 absolute left-0 z-10 bg-white ${
        expand ? "w-[15rem] px-6" : ""
      }`}
    >
      <div
        className={`mb-12 flex  ${
          expand ? "justify-between" : "justify-center"
        }`}
      >
        {expand && <h1>LOGO</h1>}
        <button>{expand ? <ChevronLeftIcon /> : <ChevronRightIcon />}</button>
      </div>
      <div
        className={`flex flex-col   ${
          expand ? "items-start gap-8" : "items-center gap-4"
        }`}
      >
        <div
          className={`flex   items-center text-center ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <AccountCircleIcon color="" />
          <p className="text-sm">User</p>
        </div>
        <div
          className={`flex   items-center text-center ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <DashboardIcon />
          <p className="text-sm">Dashboard</p>
        </div>
        <div
          className={`flex   items-center text-center ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <PeopleIcon />
          <p className="text-sm">User & Counselor</p>
        </div>
        <div
          className={`flex   items-center text-center ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <ListAltIcon />
          <p className="text-sm">Counseling</p>
        </div>
        <div
          className={`flex   items-center text-center ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <WorkIcon />
          <p className="text-sm">Career</p>
        </div>
        <div
          className={`flex   items-center text-center ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <ArticleIcon />
          <p className="text-sm">Article & Forum</p>
        </div>
        <div
          className={`flex   items-center text-center ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <FolderIcon />
          <p className="text-sm">Report</p>
        </div>
      </div>
      <div
        className={`flex   items-center text-center mt-auto ${
          expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
        }`}
      >
        <ExitToAppIcon />
        <p className="text-sm">Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
