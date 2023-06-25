import { getAuthCookie } from "../utils/cookies";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const getAllCommentByArticleId = async (articleId) => {
    try {
      const token = getAuthCookie();
  
      const config = {
        method: "GET",
        baseURL: VITE_API_BASE_URL,
        url: `/admin/articles/${articleId}/comments`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios(config);
  
      // console.log(response)
      return response.data.data;
    } catch (error) {
      throw error.response.data.meta;
    }
  }; 

export const deleteCommentByArticleIdCommentId = async (articleId, commentId) => {
  try {
    const token = getAuthCookie();

    const config = {
      method: "DELETE",
      baseURL: VITE_API_BASE_URL,
      url: `/admin/articles/${articleId}/comments/${commentId}`,
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


