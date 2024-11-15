import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const addGift = async (body) => {
  const response = await CustomAxios.post(`${baseUrl}/gift`, body);
  return response.data;
};

// handleAPI
export const editGiftStatus = async (body) => {
  const response = await CustomAxios.patch(`${baseUrl}/gift/${body.id}`, body.data);
  return response.data;
};

export const getAllGiftsByCampaign = async ({ campaignId, searchString, status, page }) => {
  const queryParams = {
    campaignId,
    searchString,
    status,
    page,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/gift/campaign/${campaignId}?${queryString}`);
  return response.data;
};
