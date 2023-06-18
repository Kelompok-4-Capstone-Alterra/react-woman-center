import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import InputField from './InputField';

const FormLogin = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://13.210.163.192:8080/admin/login', {
        username: data.username,
        password: data.password
      });

      // Handle the response data here
      console.log(response.data);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField name="username" label="Username" type="text" placeholder="johndoe" errors={errors} register={register} />
        <InputField name="password" label="Password" type="password" placeholder="it's secret" errors={errors} register={register} />
        <input
          className="flex justify-center bg-primaryMain px-2 py-4 rounded text-white font-medium w-full"
          type="submit"
          value="Sign In"
        />
      </form>
    </div>
  );
};

export default FormLogin;
