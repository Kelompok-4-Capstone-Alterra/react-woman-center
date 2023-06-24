import { getAuthCookie } from "../utils/cookies";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const getStatistics = async () => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/statistics",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);

    return response.data.data;

  } catch (error) {
    throw error.response.data.meta;
  }
};