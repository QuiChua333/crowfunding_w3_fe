import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getCurrentUser = async () => {
  const response = await CustomAxios.get(`${baseUrl}/user/findMe`);
  return response.data;
};

export const getUserByEmail = async (email) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getUserByEmail/${email}`);
  return response.data;
};

export const getLinkVerifyUser = async (ownerId) => {
  const response = await CustomAxios.get(`${baseUrl}/user/getLinkVerifyUser/${ownerId}`);
  return response.data;
};
