import axios from 'axios';
import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const register = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/auth/register`, body);
  return response.data;
};

export const submitEmailForgotPassword = async ({ email }) => {
  await CustomAxios.post(`${baseUrl}/auth/forgot-password`, { email });
};

export const resetPassword = async ({ token, password }) => {
  await CustomAxios.post(`${baseUrl}/auth/reset-password`, { token, password });
};

export const resendEmailConfirm = async () => {
  await CustomAxios.get(`${baseUrl}/auth/resend-email-confirm`);
};

export const submitLogin = async (data) => {
  const response = await axios.post(`${baseUrl}/auth/login`, data);
  return response.data;
};

export const logOut = async () => {
  const response = await CustomAxios.get(`${baseUrl}/auth/logout`);
  return response.data;
};

export const loginGoogle = async () => {
  const response = await axios.get(`${baseUrl}/auth/google/login`);
  return response.data;
};
