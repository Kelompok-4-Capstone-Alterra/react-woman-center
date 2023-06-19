import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import { useDispatch } from "react-redux";
import InputField from "./InputField";
import { updateToken } from "../features/auth/authSlice";
import { setAuthCookie } from "../utils/cookies";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import ButtonPrimary from "./ButtonPrimary";

const FormLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState({});
  const [isShowErrorToast, setIsShowErrorToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      const token = response.data.token;

      dispatch(updateToken(token));
      setAuthCookie(token);
      navigate("/dashboard");
    } catch (error) {
      setIsShowErrorToast(true);
      setErrorLogin({
        ...error,
        message: "You have entered an invalid username or password",
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Snackbar
        open={isShowErrorToast}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setIsShowErrorToast(false)}
      >
        <Alert
          onClose={() => setIsShowErrorToast(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorLogin.message}
        </Alert>
      </Snackbar>
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
        {/* <input
          className="flex justify-center bg-primaryMain px-2 py-4 rounded text-white font-medium w-full"
          value="Sign In"
        /> */}
      </form>
    </div>
  );
};

export default FormLogin;
