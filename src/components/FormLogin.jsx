import React , { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from './InputField'


const FormLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div>
     <form onSubmit={handleSubmit(onSubmit)}>
        <InputField name="username" label="Username" type="text" placeholder="johndoe" errors={errors} register={register}  />
        <InputField name="password" label="Password" type="password" placeholder="it's secret" errors={errors} register={register}  />
        <input
        className="flex justify-center bg-primaryMain px-2 py-4 rounded text-white font-medium w-full" 
        type="submit"
        value="Sign In" />
      </form>
    </div>
  );
};

export default FormLogin;
