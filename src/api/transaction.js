import { getAuthCookie } from "../utils/cookies";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const getAllTransactions = async (params) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const response = await axios(config);

    return response.data.data.transaction;
  } catch (error) {
    throw error.response.data.meta;
  }
};
