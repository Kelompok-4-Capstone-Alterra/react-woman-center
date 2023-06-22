import { getAuthCookie } from '../utils/cookies';
import axios from 'axios';


const { VITE_API_BASE_URL } = import.meta.env;

export const getAllForums = async (params) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: 'GET',
      baseURL: VITE_API_BASE_URL,
      url: '/admin/forums',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    };

    const response = await axios(config);

    return response.data.data.forums;
  } catch (error) {
    throw error.response.data.meta;
  }
};


export const deleteForumById = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: 'DELETE',
      baseURL: VITE_API_BASE_URL,
      url: `/admin/forums/${id}`,
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
