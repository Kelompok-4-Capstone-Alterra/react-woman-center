import { useNavigate } from "react-router";
import loginImage from "../assets/login-image.png";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Button from "../components/Button";
import "../App.css";

function LandingPage() {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex relative w-full h-screen bg-primaryPressed">
      <div className="flex flex-col justify-center text-left pl-[117px] pr-[139px] w-full h-full">
        <p className="text-[32px] mb-2 font-medium text-secondarySurface ">
          Welcome to,
        </p>
        <p className="text-[28px] text-white mb-8 font-medium">
          Women Center's Admin Panel!
        </p>
        <p className="text-base text-white mb-16">
          As an administrator of a women's center, your role is to oversee the
          day-to-day operations of the center and ensure that it is fulfilling
          its mission of supporting and empowering women.
        </p>
        <button
          className="bg-[#BDB728] h-[56px] text-white transition border-[#EADB7D] hover:bg-[#ada921] active:bg-[#913175] hover:outline-[#ada921]"
          onClick={navigateToLogin}
        >
          <LoginOutlinedIcon className="m-2.5 pb-0.5" /> Get into the dashboard
        </button>
      </div>
      <div
        id="login-image"
        className="flex items-center justify-center w-full h-full"
      >
        <img src={loginImage} alt="login-image" className="max-h-screen" />
      </div>
    </div>
  );
}
export default LandingPage;
