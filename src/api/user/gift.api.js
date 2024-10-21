import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getAllGiftsByCampaign = async ({ id, queryString }) => {
  const response = await CustomAxios.get(`${baseUrl}/gift/getAllGiftsByCampaign/${id}?${queryString}`);
  return response.data;
};
