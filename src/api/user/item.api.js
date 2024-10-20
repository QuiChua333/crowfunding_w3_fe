import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getItemsByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/item/getItemsByCampaign/${id}`);
  return response.data;
};

export const addItem = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/item/addItem`, body);
  return response.data;
};

export const editItem = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/item/editItem/${body.id}`, body.item);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/item/deleteItem/${id}`);
  return response.data;
};

export const getItemsContainPerksByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/item/getItemsByCampaignContainPerk/${id}`);
  return response.data;
};

export const getItemContainPerks = async (body) => {
  const response = await CustomAxios.get(`${baseUrl}/item/getItemByIdContainPerk/${body.itemId}/${body.campaignId}`);
  return response.data;
};
