import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const sendVerifyCode = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/users/verify/send`, { email });
        return response.data;
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw error;
    }
};

export const createUser = async (payload) => {
    const response = await axios.post(`${API_URL}/users`, payload);
    return response.data; // { code: 200, message: "...", data: null }
};
