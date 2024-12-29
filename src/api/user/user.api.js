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
  return response.data;
};

// handleAPI
export const updateProfileUser = async ({ formData }) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// handleAPI
export const updatePasswordUser = async ({ currentPassword, newPassword }) => {
  const response = await CustomAxios.patch(`${baseUrl}/user/updatePassword`, { currentPassword, newPassword });
  return response;
};
