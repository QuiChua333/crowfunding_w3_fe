import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getItemsByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/item/campaign/${id}`);
  return response.data;
};

// handleAPI
export const addItem = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/item`, data);
  return response.data;
};

// handleAPI
export const editItem = async ({ id, ...data }) => {
  const response = await CustomAxios.patch(`${baseUrl}/item/${id}`, data);
  return response.data;
};

// handleAPI
export const deleteItem = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/item/${id}`);
  return response.data;
};

// handleAPI
export const getItemsContainPerksByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/item/campaign/${id}/contain-perk`);
  return response.data;
};

// handleAPI
export const getItemContainPerks = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/item/${id}/contain-perk`);
  return response.data;
};
