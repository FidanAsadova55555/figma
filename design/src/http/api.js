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
        console.log(` Request : ${AxiosInstance.defaults.baseURL}${url}`);
        console.log("Payload:", JSON.stringify(data, null, 2));

        const response = await AxiosInstance.post(url, data, config);
        console.log("leyla", response.data);
        return response.data;
    } catch (error) {
        console.error("error", error.response?.data || error);
        throw error;
    }
};

  