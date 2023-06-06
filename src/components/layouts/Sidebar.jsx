import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
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
import sidebarLogo from "../../assets/logo.png";

const Sidebar = ({ expand, handleExpandSidebar }) => {
  const activelink = "text-primaryMain";
  const normalLink = "hover:text-primaryMain";

  const wrapperSidebar = useRef(null);

  useClickOutside(wrapperSidebar, handleExpandSidebar);

  return (
    <div
      ref={wrapperSidebar}
      className={`h-screen shadow-right flex flex-col justify-start py-8 w-40 absolute left-0 z-10 bg-white transition-all ${
        expand ? "w-[15rem] px-6" : ""
      }`}
    >
      <div
        className={`mb-12 flex items-center h-7 ${
          expand ? "justify-between" : "justify-center"
        }`}
      >
        {expand && (
          <NavLink to={"/dashboard"}>
            <img className="w-16" src={sidebarLogo} />
          </NavLink>
        )}
        <button onClick={() => handleExpandSidebar(!expand)}>
          {expand ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
      </div>
      <div
        className={`flex flex-col ${
          expand ? "items-start gap-8" : "items-center gap-5"
        }`}
      >
        <NavLink
          to={"/profile"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
            }`}
          >
            <AccountCircleIcon color="" />
            <p className="text-sm">User</p>
          </div>
        </NavLink>
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
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
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
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
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
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
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
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
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
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
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
            }`}
          >
            <FolderIcon />
            <p className="text-sm">Report</p>
          </div>
        </NavLink>
      </div>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? activelink : normalLink)}
        style={{ marginTop: "auto" }}
      >
        <div
          className={`flex items-center text-center mt-auto ${
            expand
              ? "flex-row justify-start gap-2 gap"
              : "flex-col justify-center gap-1"
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
