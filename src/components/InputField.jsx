import React , { useState, useRef } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const InputField = ({name, label, type, placeholder, errors, register}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };


  if (type === 'password') {
    return (
      <div className="relative mb-5 flex flex-col">
        <label>{label}</label>
        <input
        type={passwordVisible ? "text" : "password"}
        placeholder={placeholder}
        className="w-full focus:outline-none focus:ring-0 focus:border-primaryMain focus:shadow-md focus:shadow-primaryMain/15 py-4 px-2 border-solid border-2 rounded mt-2"
        {...register(name, {
            required: "This field is required"
          })}
        />
        <p className="mt-2 text-red-800 font-xs font-medium"> {errors[name] && errors[name].message}</p>
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
    )
  }

  return (
    <div className="relative mb-5 flex flex-col">
          <label>{label}</label>
          <input
          className="w-full focus:outline-none focus:ring-0 focus:border-primaryMain focus:shadow-md focus:shadow-primaryMain/15 py-4 px-2 border-solid border-2 rounded mt-2"
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          {...register(name, {
              required: "This field is required"
            })}
          />
          <p className="mt-2 text-red-800 font-xs font-medium"> {errors[name] && errors[name].message}</p>
        </div>
  );
};

export default InputField;
