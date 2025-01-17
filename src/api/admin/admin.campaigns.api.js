import { CustomAxios } from '~/config';
import baseURL from '~/utils/baseURL';

// handleAPI
export const getAllCampaigns = async ({ page, status, searchString }) => {
  const queryParams = {
    page,
    searchString,
    status,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/campaign?${queryString}`);
  return response.data;
};

// handleAPI
export const getAllSuccessCampaigns = async ({ page, status, searchString }) => {
  const queryParams = {
    page,
    searchString,
    status,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/campaign/success?${queryString}`);
  return response.data;
};

// handleAPI
export const getAllFailedCampaigns = async ({ page, status, searchString }) => {
  const queryParams = {
    page,
    searchString,
    status,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await CustomAxios.get(`${baseURL}/campaign/failed?${queryString}`);
  return response.data;
};

// handleAPI
export const changeStatusCampaign = async (dataApi) => {
  await CustomAxios.patch(`${baseURL}/campaign/admin-change-status/${dataApi.id}`, { status: dataApi.status });
};

export const adminDeleteCampaign = async (id) => {
  await CustomAxios.delete(`${baseURL}campaign/adminDeleteCampaign/${id}`);
};

// handleAPI
export const editSendFundStatus = async (body) => {
  const response = await CustomAxios.patch(`${baseURL}/campaign/send-fund/${body.id}/status`, body.data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
