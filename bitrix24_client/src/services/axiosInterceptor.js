import axios from 'axios';
import { envConfig } from '../config/env';

// Tạo một instance của Axios
const api = axios.create({
    baseURL: 'https://vinhquang.bitrix24.vn',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('token'); // Lấy auth token từ localStorage

        if (!config.data || typeof config.data !== 'object') {
            config.data = {}; // Đảm bảo data luôn là một object
        }

        // Chuyển body thành { fields: {...}, auth: '...' }
        if (config.data) {
            config.data = {
                ...config.data,
                auth: authToken || '' // Thêm auth vào body
            };
        } else {
            // Nếu request không có body (ví dụ: GET), thì có thể bỏ qua hoặc xử lý riêng
        }
        return config;
    },
    (error) => {
        // Làm điều gì đó với lỗi yêu cầu
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(response.data) // Xử lý dữ liệu phản hồi ở đây
        // Làm điều gì đó với dữ liệu phản hồi
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = localStorage.getItem('token');
            const memberId = localStorage.getItem('member_id');
            const res = await api.post(`${envConfig.BE_URL}/api/refresh-token`, { token, member_id: memberId });
            if (res.status === 200) {
                const newToken = res.data.token;
                localStorage.setItem('token', newToken);

                if (originalRequest.data) {
                    originalRequest.data = {
                        ...originalRequest.data,
                        auth: newToken
                    };
                }
                return api(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default api;