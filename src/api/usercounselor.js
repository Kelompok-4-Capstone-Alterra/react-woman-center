import { getAuthCookie } from "../utils/cookies";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const getAllCounselors = async (params) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/counselors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const response = await axios(config);

    return response.data.data.counselors;
  } catch (error) {
    throw error.response.data.meta;
  }
};

export const getAllUsers = async (params) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: "/admin/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const response = await axios(config);

    return response.data.data.users;
  } catch (error) {
    throw error.response.data.meta;
  }
};

export const deleteCounselorById = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "DELETE",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/counselors/${id}`,
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

export const deleteUserById = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "DELETE",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/users/${id}`,
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

export const getUserById = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);

    return response.data.data.user;
  } catch (error) {
    throw error.response.meta;
  }
};

export const getCounselorById = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/counselors/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);

    return response.data.data.counselor;
  } catch (error) {
    throw error.response.meta;
  }
};