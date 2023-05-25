import React , { useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FormLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
     <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-5 flex flex-col">
          <label>Username</label>
          <input
          type="text"
          placeholder="@johndoe"
          className="w-full focus:outline-none focus:ring-0 focus:border-primary focus:shadow-md focus:shadow-primary/15 py-4 px-2 border-solid border-2 rounded mt-2"
          {...register("username", {
              required: "Username is required"
            })}
          />
          {errors.username && <p className="mt-2 text-red-800 font-xs font-medium">{errors.username.message}</p>}
        </div>
        <div className="relative mb-5 flex flex-col">
          <label>Password</label>
          <input
          type={passwordVisible ? "text" : "password"}
          placeholder="it's secret"
          className="w-full focus:outline-none focus:ring-0 focus:border-primary focus:shadow-md focus:shadow-primary/15 py-4 px-2 border-solid border-2 rounded mt-2"
          {...register("password", {
              required: "Password is required"
            })}
          />
          {errors.password && <p className="mt-2 text-red-800 font-xs font-medium">{errors.password.message}</p>}
          {passwordVisible ? (
            <VisibilityIcon
              className="absolute top-12 right-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <VisibilityOffIcon
              className="absolute top-12 right-4 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <input
        className="flex justify-center bg-primary px-2 py-4 rounded text-white font-medium w-full" 
        type="submit"
        value="Sign In" />
      </form>
    </div>
  );
};

export default FormLogin;
