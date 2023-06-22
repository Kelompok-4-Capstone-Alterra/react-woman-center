import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import sidebarLogo from "../../assets/logo.png";
import avatar from "../../assets/profile/avatar.png";
import { removeAuthCookie } from "../../utils/cookies";
import ModalConfirm from "../ModalConfirm";

const Sidebar = ({ expand, handleExpandSidebar }) => {
  const navigate = useNavigate();
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const activelink = "text-primaryMain";
  const normalLink = "hover:text-primaryMain";

  const wrapperSidebar = useRef(null);

  useClickOutside(wrapperSidebar, handleExpandSidebar);

  const onLogout = () => {
    navigate("/");
    removeAuthCookie();
  };

  const handleShowModalConfirm = (showModalConfirm) => {
    setIsShowModalConfirm(showModalConfirm);
  };

  return (
    <div
      ref={wrapperSidebar}
      className={`h-full overflow-hidden shadow-right flex flex-col justify-start py-8 w-40 fixed left-0 z-10 bg-white transition-all ${
        expand ? "w-[17rem] px-6" : ""
      }`}
    >
      <div
        className={`mb-10 flex items-center h-7 ${
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
          expand
            ? "items-start gap-8"
            : "items-center gap-6 mb-6 box-content w-full overflow-y-auto no-scrollbar"
        }`}
      >
        <div
          className={`flex items-center text-center ${
            expand
              ? "flex-row justify-start gap-2"
              : "flex-col justify-center gap-1"
          }`}
        >
          <img src={avatar} alt="" />
          <p className="text-sm">Admin</p>
        </div>
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
      <div
        className={`flex items-center text-center mt-auto hover:text-primaryMain cursor-pointer ${
          expand
            ? "flex-row justify-start gap-2 gap"
            : "flex-col justify-center gap-1"
        }`}
        onClick={() => handleShowModalConfirm(true)}
      >
        <ExitToAppIcon />
        <p className="text-sm">Logout</p>
      </div>
      {isShowModalConfirm && (
        <ModalConfirm
          onSure={onLogout}
          onClose={handleShowModalConfirm}
          isConfirm={isShowModalConfirm}
          messages="Are you sure want to out from the admin dashboard?"
        />
      )}
    </div>
  );
};

export default Sidebar;
