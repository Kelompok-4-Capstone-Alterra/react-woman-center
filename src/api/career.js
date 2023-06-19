import { getAuthCookie } from "../utils/cookies";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const getAllCareers = async (params) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/careers",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const response = await axios(config);

    return response.data.data.careers;
  } catch (error) {
    throw error.response.data.meta;
  }
};

export const deleteCareerById = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "DELETE",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/careers/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);

    return response.data.meta;
  } catch (error) {
    throw error.response.meta;
  }
};
