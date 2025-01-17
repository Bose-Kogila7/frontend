// src/service/UserService.js
import axiosInstance from "../AuthComponent/axiosConfig";

const UserService = {
    login: async (email, password) => {
        const response = await axiosInstance.post('http://localhost:8089/api/auth/login', { email, password });
        return response.data;
    },
};

export default UserService;