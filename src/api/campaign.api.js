import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

export const getCampaignById = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getCampaignById/${id}`);
  return response.data;
};

export const editCampaignById = async (data) => {
  const response = await CustomAxios.patch(`${baseUrl}/campaign/editCampaign/${data.id}`, data.body);
  return response.data;
};
