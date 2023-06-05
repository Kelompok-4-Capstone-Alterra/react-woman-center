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
      className={`h-screen shadow-right flex flex-col justify-start py-7 w-40 absolute left-0 z-10 bg-white ${
        expand ? "w-[15rem] px-6" : ""
      }`}
    >
      <div
        className={`mb-10 flex h-full ${
          expand ? "justify-between" : "justify-center"
        }`}
      >
        {expand && <h1>LOGO</h1>}
        <button>{expand ? <ChevronLeftIcon /> : <ChevronRightIcon />}</button>
      </div>
      <div
        className={`flex flex-col gap-8 px-6 ${
          expand ? "items-start" : "items-center"
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
        <div
          className={`flex flex-col ${
            expand ? "items-start gap-8" : "items-center gap-5"
          }`}
        >
          <NavLink
            to={"/"}
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
          to={"/login"}
          className={({ isActive }) => (isActive ? activelink : normalLink)}
        >
          <div
            className={`flex items-center text-center ${
              expand
                ? "flex-row justify-start gap-2"
                : "flex-col justify-center gap-1"
            }`}
          >
            <ExitToAppIcon />
            <p className="text-sm">Logout</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
