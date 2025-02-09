import axios from 'axios';
import { baseUrl } from '~/utils';

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const CustomAxios = axios.create({ headers });

CustomAxios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('accessToken') || '';

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

CustomAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config } = error;
    const status = error.response?.status || 500;
    if (status === 401) {
      try {
        const refreshToken = localStorage.getItem('refreshToken') || '';

        const resust = await axios.get(`${baseUrl}/auth/refresh-token`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        const { accessToken, refreshToken: newRefreshToken } = resust.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
        return CustomAxios(config);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          backToLogin();
        } else return Promise.reject(error);
      }
    } else return Promise.reject(error);
  },
);

function backToLogin() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
}

export default CustomAxios;
