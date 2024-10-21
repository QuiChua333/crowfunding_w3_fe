import axios from 'axios';
import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const register = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/user/checkRegisterEmail`, body);
  return response.data;
};

export const verifyEmailUrl = async (url) => {
  await CustomAxios.get(url);
};

export const submitEmailForgotPassword = async (body) => {
  await CustomAxios.get(body.url, { email: body.email });
};

export const submitLogin = async (data) => {
  const response = await axios.post(`${baseUrl}/user/login`, data);
  return response.data;
};

export const verifyUrl = async (url) => {
  await CustomAxios.get(url);
};

export const submitResetPassword = async (body) => {
  await CustomAxios.patch(body.url, { newPassword: body.pass, id: body.id });
};
