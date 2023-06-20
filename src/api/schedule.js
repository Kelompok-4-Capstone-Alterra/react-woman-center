import { getAuthCookie } from "../utils/cookies";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const getSchedule = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "GET",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/counselors/${id}/schedules`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);

    const dates = await response.data.data.schedule.dates.map(
      (date) => new Date(date)
    );
    const times = await response.data.data.schedule.times;

    return { dates, times };
  } catch (error) {
    console.error(error);
  }
};

export const addSchedule = async (payloads) => {
  try {
    const token = getAuthCookie();

    const { counselorId, dates, times } = payloads;

    const config = {
      method: "POST",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/counselors/${counselorId}/schedules`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        dates,
        times,
      },
    };

    const response = await axios(config);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const updateSchedule = async (payloads) => {
  try {
    const token = getAuthCookie();

    const { counselorId, dates, times } = payloads;

    const config = {
      method: "PUT",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/counselors/${counselorId}/schedules`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        dates,
        times,
      },
    };

    const response = await axios(config);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteSchedule = async (id) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "DELETE",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/counselors/${id}/schedules`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};
