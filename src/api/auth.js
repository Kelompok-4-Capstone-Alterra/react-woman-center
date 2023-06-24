import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const login = async (payloads) => {
  try {
    const { username, password } = payloads;
    const config = {
      method: "POST",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/auth/login",
      data: {
        username,
        password,
      },
    };

    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw error.response.data.meta;
  }
};
