import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getPerksByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/getPerksByCampaignId/${id}`);
  return response.data;
};

export const getPerk = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/getPerkById/${id}`);
  return response.data;
};

export const deletePerk = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/perk/delete/${id}`);
  return response.data;
};

export const addPerk = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/perk/addPerk`, body);
  return response.data;
};

export const editPerk = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/perk/editPerk/${body.id}`, body.perk);
  return response.data;
};

export const getPerksHasListItemsByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/perk/getPerksHasListItemsByCampaignId/${id}`);
  return response.data;
};
