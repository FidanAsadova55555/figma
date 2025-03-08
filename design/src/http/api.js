import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: "http://localhost:1337/api/",
    timeout: 1000,
});

export const getAPIData = async (url, ...config) => {
    return await AxiosInstance.get(url, ...config).then((res) => res.data);
};

export const postAPIData = async (url, data, config = {}) => {
    try {
      const response = await AxiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error("❌ API Error (POST):", error);
      throw error;
    }
  };
  