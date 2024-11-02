import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const createCampaign = async () => {
  const response = await CustomAxios.post(`${baseUrl}/campaign/new`);
  return response.data;
};

// handleAPI
export const getCampaignById = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/${id}`);
  return response.data;
};

// handleAPI
export const checkCampaignOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/${id}/checkOwner`);
  return response.data;
};

// handleAPI
export const editCampaignById = async (data) => {
  const response = await CustomAxios.patch(`${baseUrl}/campaign/${data.id}`, data.body);
  return response.data;
};

// handleAPI
export const launchCampaign = async (id) => {
  const response = await CustomAxios.post(`${baseUrl}/campaign/${id}/launch`);
  return response.data;
};

// handleAPI
export const deleteCampaign = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/campaign/${id}`);
  return response;
};

// handleAPI
export const getCampaignsOfOwner = async (userId) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/owner/${userId}`);
  return response;
};

// handleAPI
export const getQuantityCampaignsOfOwner = async (campaignId) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/quantity/owner/${campaignId}`);
  return response.data;
};

export const sendReport = async (body) => {
  const response = await CustomAxios.post(body.url, body.data);
  return response.data;
};

export const paymentSuccess = async (url) => {
  const response = await CustomAxios.post(url);
  return response.data;
};

export const getPopulateCampaigns = async () => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/getPopulateCampaigns`);
  return response.data.data;
};
