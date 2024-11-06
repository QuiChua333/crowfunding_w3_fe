import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getCurrentUser = async () => {
  const response = await CustomAxios.get(`${baseUrl}/user/findMe`);
  return response.data;
};

// handleAPI
export const getUserByEmail = async (email) => {
  const response = await CustomAxios.get(`${baseUrl}/user/email${email}`);
  return response.data;
};

// handleAPI
export const getUserById = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/user/${id}`);
  return response;
};

// handleAPI
export const updateProfileUser = async (data) => {
  const response = await CustomAxios.patch(`${baseUrl}/user`, data);
  return response.data;
};

// handleAPI
export const updatePasswordUser = async ({ currentPassword, newPassword }) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/updatePassword`, { currentPassword, newPassword });
  return response;
};

export const getAllContributesOfUser = async (url) => {
  const response = await CustomAxios.get(url);
  return response.data;
};
