import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getPerksByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/campaign/${id}`);
  return response.data;
};

// handleAPI
export const getPerk = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/${id}`);
  return response.data;
};

// handleAPI
export const deletePerk = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/perk/${id}`);
  return response.data;
};

// handleAPI
export const addPerk = async (data) => {
  const response = await CustomAxios.post(`${baseUrl}/perk`, data);
  return response.data;
};

// handleAPI
export const editPerk = async ({ perkId, data }) => {
  const response = await CustomAxios.patch(`${baseUrl}/perk/${perkId}`, data);
  return response.data;
};

// handleAPI
export const getPerksHasListItemsByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/contain-items/campaign/${id}`);
  return response.data;
};
