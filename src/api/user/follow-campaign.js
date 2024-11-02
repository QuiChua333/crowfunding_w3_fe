import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getCampaignsFollowed = async () => {
  const response = await CustomAxios.get(`${baseUrl}/follow-campaign/me}`);
  return response;
};

// handleAPI
export const followCampaign = async (id) => {
  const response = await CustomAxios.post(`${baseUrl}/follow-campaign/follow`, { campaignId: id });
  return response.data;
};
