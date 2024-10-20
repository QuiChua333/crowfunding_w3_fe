import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

export const getAllUsers = async (url) => {
  const response = await CustomAxios.get(url);
  return response.data;
};

export const changeStatusUser = async (id) => {
  const response = await CustomAxios.put(`${baseURL}/user/changeStatusUser/${id}`);
  return response;
};

export const verifyInfoUser = async (id) => {
  await CustomAxios.put(`${baseURL}/user/VerifiedInfoOfUser/${id}`);
};
