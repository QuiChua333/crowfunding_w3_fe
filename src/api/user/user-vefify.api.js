import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getInfoVerifyUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/user-verify/${id}`);
  return response.data;
};

// handleAPI
export const requestVerifyInfoUser = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/user-verify`, data);
  return response;
};
