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

    const response = await axios(config, params);

    return response.data.data.transaction;
  } catch (error) {
    throw error.response.data.meta;
  }
};

export const getReport = async (params) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/transactions/report",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const response = await axios(config, params);

    return response.data.data.transaction;
  } catch (error) {
    throw error.response.data.meta;
  }
};

export const sendTransactionLink = async (id, link) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "PUT",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/transactions/link",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        transaction_id: id,
        link,
      },
    };

    const response = await axios(config);
    console.log("Response:", response.data);
  } catch (error) {
    throw error.response.data.meta;
  }
};

export const cancelTransaction = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "PUT",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/transactions/cancel",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        transaction_id: id,
      },
    };

    const response = await axios(config);
    console.log("Response:", response.data);
  } catch (error) {
    throw error.response.data.meta;
  }
};
