import { CustomAxios } from '~/config';
import { baseUrl } from '~/utils';

// handleAPI
export const createCampaign = async () => {
  const response = await CustomAxios.post(`${baseUrl}/campaign/new`);
  return response.data;
};

// handleAPI
export const getCampaignById = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/id/${id}`);
  return response.data;
};

// handleAPI
export const getQuantitySuccessCampaignByCampaignId = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/quantity-success/${id}`);
  return response.data;
};

// handleAPI
export const checkCampaignOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/${id}/checkOwner`);
  return response.data;
};

// handleAPI
export const editCampaignById = async ({ id, formData, data }) => {
  if (formData) {
    console.log(formData);
    const response = await CustomAxios.patch(`${baseUrl}/campaign/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } else {
    const response = await CustomAxios.patch(`${baseUrl}/campaign/${id}`, data);
    return response.data;
  }
};

// handleAPI
export const launchCampaign = async (id) => {
  const response = await CustomAxios.post(`${baseUrl}/campaign/${id}/launch`);
  return response.data;
};

// handleAPI
export const deleteCampaign = async (id) => {
  const response = await CustomAxios.delete(`${baseUrl}/campaign/${id}`);
  return response.data;
};

// handleAPI
export const getCampaignsOfOwner = async (userId) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/owner/${userId}`);
  return response.data;
};

// handleAPI
export const getQuantityCampaignsOfOwner = async (campaignId) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/quantity/owner/${campaignId}`);
  return response.data;
};

// handleAPI
export const getCampaignsOfUser = async (userId) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/user/${userId}`);
  return response;
};

// handleAPI
export const getQuantityCampaignsOfUser = async (id) => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/quantity/user/${id}`);
  return response.data;
};

// handleAPI
export const getCampainsExplore = async ({ page, status, searchString, criteria, field, fieldGroup }) => {
  const queryParams = {
    page,
    status,
    searchString,
    criteria,
    field,
    fieldGroup,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseUrl}/campaign/explore?${queryString}`);
  return response.data;
};

// handleAPI
export const getPopulateCampaigns = async () => {
  const response = await CustomAxios.get(`${baseUrl}/campaign/popularity`);
  return response.data;
};
