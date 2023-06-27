import { useForm } from "react-hook-form";
import { login } from "../../api/auth";
import { useDispatch } from "react-redux";
import InputField from "../InputField";
import { updateToken } from "../../features/auth/authSlice";
import { setAuthCookie } from "../../utils/cookies";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import ButtonPrimary from "../ButtonPrimary";
import Popup from "../Dashboard/Popup";

const FormLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const onLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      const token = response.data.token;

      dispatch(updateToken(token));
      setAuthCookie(token);
      navigate("/dashboard");
    } catch (error) {
      handlePopup(false, "You have entered an invalid username or password");
    }
    setIsLoading(false);
  };

  const handlePopup = (isSuccess, message) => {
    setIsOpenPopup(true);
    setIsSuccessPopup(isSuccess);
    setPopupMessage(message);
    setTimeout(function () {
      setIsOpenPopup(false);
    }, 2000);
  };

  return (
    <div>
      <Popup
        isSuccess={isSuccessPopup}
        isOpen={isOpenPopup}
        message={popupMessage}
      />
      <form onSubmit={handleSubmit(onLogin)}>
        <InputField
          name="username"
          label="Username"
          type="text"
          placeholder="johndoe"
          errors={errors}
          register={register}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="it's secret"
          errors={errors}
          register={register}
        />
        <ButtonPrimary
          type="submit"
          className="w-full font-medium rounded py-4"
          processing={isLoading}
        >
          <span className="text-[1rem]">
            {isLoading ? "Loading..." : "Sign In"}
          </span>
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default FormLogin;
