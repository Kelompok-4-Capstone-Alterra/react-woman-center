import React from "react";
import loginImage from '../assets/login-image.png'
import FormLogin from "../components/FormLogin";
import ArrowBack from "@mui/icons-material/ArrowBack";

const Login = () => {
  return (
    <div className="flex relative w-full h-screen bg-primaryPressed">
     <div id='login-form' className="flex flex-col justify-center bg-white px-48 w-full h-full">
            <div className="mb-12">
            <ArrowBack />
            </div>
            <h2 className="font-medium text-2xl mb-3">Sign In as Admin</h2>
            <h2 className="font-normal text-base text-gray-400 mb-5">To access the admin dashboard of Women Center, please sign in first. </h2>
            <FormLogin />
     </div>
     <div id='login-image' className="flex items-center justify-center w-full h-full">
        <img src={loginImage} alt="login-image" className="max-h-screen" />
     </div>
    </div>
  );
};

export default Login;
