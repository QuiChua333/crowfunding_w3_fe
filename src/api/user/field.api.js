import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getFieldGroupByCategory = async () => {
  const response = await CustomAxios.get(`${baseUrl}/field/group-by-category`);
  return response.data;
};
