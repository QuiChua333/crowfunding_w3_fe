import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getInfoVerifyUser = async (id, email) => {
  const response = await CustomAxios.get(`${baseUrl}/user-verify/${id}`);
  return {
    ...response.data,
    email,
  };
};

// handleAPI
export const requestVerifyInfoUser = async (formData) => {
  const response = await CustomAxios.post(`${baseUrl}/user-verify`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// handleAPI
export const updateVerifyInfoUser = async (formData) => {
  const response = await CustomAxios.patch(`${baseUrl}/user-verify`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
