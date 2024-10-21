import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getAllGiftsByCampaign = async ({ id, queryString }) => {
  const response = await CustomAxios.get(`${baseUrl}/gift/getAllGiftsByCampaign/${id}?${queryString}`);
  return response.data;
};

export const addGift = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/gift/addGift`, body);
  return response.data;
};

export const editGiftStatus = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/gift/editStatus/${body.id}`, body.data);
  return response.data;
};
