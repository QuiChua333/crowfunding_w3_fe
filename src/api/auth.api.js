import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const register = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/api/auth/register`, body);
  return response.data;
};
