import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getCurrentUser = async () => {
  const response = await CustomAxios.get(`${baseUrl}/user/getInfoCurrentUser`);
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getUserByEmail/${email}`);
  return response.data;
};
