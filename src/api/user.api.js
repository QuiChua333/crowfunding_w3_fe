import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getCurrentUser = async () => {
  const response = await CustomAxios.get(`${baseUrl}/api/user/findMe`);
  return response.data;
};
