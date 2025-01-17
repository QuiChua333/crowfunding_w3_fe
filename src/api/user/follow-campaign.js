import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const getCampaignsFollowed = async ({ id, searchString, status, page }) => {
  const queryParams = {
    page,
    searchString,
    status,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/follow-campaign/user/${id}?${queryString}`);
  return response.data;
};

// handleAPI
export const followCampaign = async (id) => {
  const response = await CustomAxios.post(`${baseUrl}/follow-campaign/follow`, { campaignId: id });
  return response.data;
};

// handleAPI
export const getQuantityFollowsOfCampaign = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/follow-campaign/quantity/${id}`);
  return response.data;
};
