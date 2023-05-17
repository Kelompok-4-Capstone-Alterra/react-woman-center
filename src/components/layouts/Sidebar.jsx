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
import { NavLink } from "react-router-dom";

const Sidebar = ({ expand }) => {
  const activelink = "text-primaryMain";
  const normalLink = "hover:text-primaryMain";
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
        <NavLink
          to={"/profile"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex   items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center"
            }`}
          >
            <AccountCircleIcon color="" />
            <p className="text-sm">User</p>
          </div>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex   items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center"
            }`}
          >
            <DashboardIcon />
            <p className="text-sm">Dashboard</p>
          </div>
        </NavLink>
        <NavLink
          to={"/user-counselor"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex   items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center"
            }`}
          >
            <PeopleIcon />
            <p className="text-sm">User & Counselor</p>
          </div>
        </NavLink>
        <NavLink
          to={"/counseling"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex   items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center"
            }`}
          >
            <ListAltIcon />
            <p className="text-sm">Counseling</p>
          </div>
        </NavLink>
        <NavLink
          to={"/career"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex   items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center"
            }`}
          >
            <WorkIcon />
            <p className="text-sm">Career</p>
          </div>
        </NavLink>
        <NavLink
          to={"/article-forum"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex   items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center"
            }`}
          >
            <ArticleIcon />
            <p className="text-sm">Article & Forum</p>
          </div>
        </NavLink>
        <NavLink
          to={"/report"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex   items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center"
            }`}
          >
            <FolderIcon />
            <p className="text-sm">Report</p>
          </div>
        </NavLink>
      </div>
      <NavLink
        to={"/login"}
        className={`${({ isActive }) =>
          isActive ? activelink : normalLink} mt-auto`}
      >
        <div
          className={`flex   items-center text-center mt-auto ${
            expand ? "flex-row justify-start gap-2" : "flex-col justify-center"
          }`}
        >
          <ExitToAppIcon />
          <p className="text-sm">Logout</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
