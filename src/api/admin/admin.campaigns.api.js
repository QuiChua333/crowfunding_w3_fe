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
export const changeStatusCampaign = async (dataApi) => {
  await CustomAxios.patch(`${baseURL}/campaign/admin-change-status/${dataApi.id}`, { status: dataApi.status });
};

export const adminDeleteCampaign = async (id) => {
  await CustomAxios.delete(`${baseURL}campaign/adminDeleteCampaign/${id}`);
};
