import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getFieldGroupByCategory = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/field/getFieldGroupByCategory`);
  return response.data;
};
